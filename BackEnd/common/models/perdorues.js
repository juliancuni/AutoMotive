'use strict';

module.exports = function (Perdorues) {

    const app = require('../../server/server');
    const loopback = require("loopback");
    var path = require('path');

    //Disa validation me mesazhe te percaktuara.
    //<TODO> duhen rishikuar. Erroret nuk jane standard.
    Perdorues.beforeRemote('create', function (context, empty, next) {
        if (context.args.data.password.length < 6) {
            let error = new Error("Fjalëkalimi i shkurtër. Duhet 6 karaktere")
            error.statusCode = 422;
            error.code = "FJALEKALIMI_SHKURTER";
            return next(error);
        }
        Perdorues.validatesUniquenessOf('email', { code: "EMAIL_UNIQUE", message: 'Ky email është regjistruar më parë' });
        Perdorues.validatesUniquenessOf('username', { code: "USERNAME_UNIQUE", message: 'Ky përdorues është regjistruar më parë' });
        next();
    })
    //Para se te konfirmoje useri, kontrollo nese ka bere konfirmim me pare duke kerkuar verificationToken ne user object.
    //Nese ska bere konfirmim vazhdo, nese jo redirect to client app tokenExpired. 
    Perdorues.beforeRemote('confirm', function (context, empty, next) {
        const token = context.args.token;
        Perdorues.findOne({ where: { verificationToken: token } }, function (err, user) {
            if (err) console.log("EEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRR")
            if (user) {
                next();
            } else {
                let res = context.res;
                gjejNdermarrje().then((ndermarrje) => {
                    res.redirect((process.env.NODE_ENV == "production") ? 'https://' + ndermarrje.domain + '/login?expired=true' : 'http://localhost:4200/login?expired=true');
                }).catch((err) => {
                    console.log(err)
                })
            }
        })
    })
    //Para se te resetoje pass validate password;
    Perdorues.beforeRemote('setPassword', function (context, empty, next) {
        let newPass = context.args.newPassword;
        if (newPass.length < 6) {
            let error = new Error("Fjalëkalimi i shkurtër. Duhet 6 karaktere")
            error.statusCode = 422;
            error.code = "FJALEKALIMI_SHKURTER";
            return next(error);
            // return next(new Error = { statusCode: 422, code: "FJALEKALIMI_SHKURTER", name: "ValidationError", message: "Fjalëkalimi i shkurtër. Duhet 6 karaktere" });
        }
        next();
    })
    //Pasi user eshte regjistruar dergo email per konfirmim
    Perdorues.afterRemote('create', function (context, user, next) {
        gjejNdermarrje().then(function (ndermarrje) {
            const ndermarrjeDomain = ndermarrje.domain.split(":")[0];

            var options = {
                type: 'email',
                to: user.email,
                from: 'noreply@' + ndermarrje.domain,
                subject: 'Verifikim ' + ndermarrje.emer,
                headers: { 'Mime-Version': '1.0' },
                template: './templates/verify.ejs',
                redirect: (process.env.NODE_ENV == "production") ? ndermarrje.domain + "/login/?uid=" + user.id : "http://localhost:4200/login/?uid=" + user.id,
                user: user,
                ndermarrje: ndermarrje,
                host: (process.env.NODE_ENV == "production") ? ndermarrje.domain : ndermarrjeDomain,
                protocol: (process.env.NODE_ENV == "production") ? 'https' : 'http',
                port: (process.env.NODE_ENV == "production") ? 443 : null,
            };

            user.verify(options, function (err, response) {
                if (err) {
                    User.deleteById(user.id);
                    return next(err);
                }
            });
            //Pasi te krijohet user i ri (nga admin, root, ose veteRegjistrim) shiko nese i eshte percaktuar ndonje role
            //Nese jo caktoi automatikisht rolin client. 
            if (!user.role) {
                const Role = app.models.Role;
                Role.findOne({ where: { name: "client" } }, function (err, role) {
                    if (err) next(err);
                    role.principals.create({
                        principalType: app.models.RoleMapping.USER,
                        principalId: user.id
                    }, function (err, principal) {
                        if (err) next(err)
                    })
                })
            }
        }).catch(function (err) {
            next(err);
        })
        next();
    });
    //Before Login Shiko per vlefshmerine e username ose password
    Perdorues.beforeRemote('login', function (ctx, modelInstance, next) {
        Perdorues.findOne({ where: { "username": ctx.req.body.username } }, function (err, perdorues) {
            if (err) {
                err = new Error('Fatal ERROR! ' + err);
                err.statusCode = 500;
                err.code = 'FATAL_ERROR';
                next(err);
            }
            if (perdorues) {
                if (perdorues.enabled) {
                    perdorues.hasPassword(ctx.req.body.password, function (err, isMatch) {
                        if (err) {
                            //handle fatal error ketu
                        } else if (!isMatch) {
                            var defaultError = new Error('Fjalëkalimi gabim');
                            defaultError.statusCode = 401;
                            defaultError.code = 'FJALEKALIMI_GABIM';
                            next(defaultError);
                        } else {
                            next();
                        }
                    })
                } else {
                    var defaultError = new Error('Kjo llogari është e bllokuar!');
                    defaultError.statusCode = 401;
                    defaultError.code = 'LLOGARI_INAKTIVE';
                    next(defaultError);
                }
            } else {
                var defaultError = new Error('Ky Përdorues nuk egziston');
                defaultError.statusCode = 401;
                defaultError.code = 'PERDORUES_NUK_EGZISTON';
                next(defaultError);
            }
        });
    });
    //Reset Password. Dergo link dhe token per reset.
    Perdorues.on('resetPasswordRequest', function (info) {
        gjejNdermarrje().then(function (ndermarrje) {
            let data = {
                ndermarrje: ndermarrje,
                user: info.user,
                url: (process.env.NODE_ENV == "production") ? "https://" + ndermarrje.domain + "/reset?access_token=" + info.accessToken.id : "http://localhost:4200/reset?access_token=" + info.accessToken.id,
            }
            var renderer = loopback.template(path.resolve(__dirname, '../../templates/resetpass.ejs'));
            var html = renderer(data);
            Perdorues.app.models.Email.send({
                to: info.email,
                from: "noreply@" + ndermarrje.domain,
                subject: ndermarrje.emer + " - Reset Fjalëkalimin",
                html: html,
                user: info.user
            })
        }).catch(function (err) {
            console.log(err);
        })
    })
    //Gjej Rolet Remote Method
    Perdorues.gjejRolet = async (perdoruesId) => {
        const RoleMapping = app.models.RoleMapping;
        const Role = app.models.Role;
        let rolet = [];
        try {
            let mappings = await RoleMapping.find({ where: { principalId: perdoruesId } });
            
            let mappsIdArr = [];
            mappings.forEach(mapp => {
                mappsIdArr.push(mapp.roleId);
            });
        rolet = await Role.find({where: {id: {inq: mappsIdArr}}});
           
        } catch (error) {
            err = new Error()
            mapps = [error.message];
        }
        return rolet;
    };
    //Gjej Rolet Definitions
    Perdorues.remoteMethod('gjejRolet', {
        description: "Gjej Rolet per Perdoruesin me perdoruesId",
        accepts: [{ arg: 'perdoruesId', type: 'string' }],
        returns: [{ arg: 'Rolet', type: 'array' }],
        http: [{ verb: "get", path: "/rolet" }],
    });
    //Gjejndermarrje. 
    function gjejNdermarrje() {
        return new Promise(function (resolve, reject) {
            const Nderrmarjet = app.models.Ndermarrje;
            Nderrmarjet.findOne({}, function (err, ndermarrje) {
                if (err) reject(err)
                resolve(ndermarrje)
            })

        })
    }
    //Gjej
};
