'use strict';

module.exports = function (Amuser) {

    const app = require('../../server/server');
    const loopback = require("loopback");
    var path = require('path');
    const config = require('../../server/config.json');
    //Disa validation me mesazhe te percaktuara.
    //<TODO> duhen rishikuar. Nuk jane standard.
    Amuser.beforeRemote('create', function (context, empty, next) {
        if (context.args.data.password.length < 6) {
            let error = new Error("Fjalëkalimi i shkurtër. Duhet 6 karaktere")
            error.statusCode = 422;
            error.code = "FJALEKALIMI_SHKURTER";
            return next(error);
        }
        Amuser.validatesUniquenessOf('email', { code: "EMAIL_UNIQUE", message: 'Ky email është regjistruar më parë' });
        Amuser.validatesUniquenessOf('username', { code: "USERNAME_UNIQUE", message: 'Ky përdorues është regjistruar më parë' });
        next();
    })
    //Para se te konfirmoje useri, kontrollo nese ka bere konfirmim me pare duke kerkuar verificationToken ne user object.
    //Nese ska bere konfirmim vazhdo, nese jo redirect to client app tokenExpired. 
    Amuser.beforeRemote('confirm', function (context, empty, next) {
        const token = context.args.token;
        Amuser.findOne({ where: { verificationToken: token } }, function (err, user) {
            if (err) console.log("EEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRR")
            if (user) {
                next();
            } else {
                let res = context.res;
                const orgs = app.models.org;
                orgs.findOne({}, function (err, org) {
                    if (err) console.log(err)
                    res.redirect((process.env.NODE_ENV == "production") ? 'https://' + org.domain + '/login?expired=true' : 'http://localhost:4200/login?expired=true');
                })

            }
        })
    })
    //Para se te resetoje pass validate password;
    Amuser.beforeRemote('setPassword', function (context, empty, next) {
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
    Amuser.afterRemote('create', function (context, user, next) {
        const orgs = app.models.org;
        gjejOrg().then(function (org) {
            const orgDomain = org.domain.split(":")[0];
            
            var options = {
                type: 'email',
                to: user.email,
                from: 'noreply@' + org.domain,
                subject: 'Verifikim ' + org.orgname,
                headers: { 'Mime-Version': '1.0' },
                template: './templates/verify.ejs',
                //TODO verification link
                redirect: (process.env.NODE_ENV == "production") ? org.domain + "/login/?uid=" + user.id : "http://localhost:4200/login/?uid=" + user.id,
                user: user,
                org: org,
                host: (process.env.NODE_ENV == "production") ? org.domain : orgDomain,
                protocol: (process.env.NODE_ENV == "production") ? 'https' : 'http',
                port: (process.env.NODE_ENV == "production") ? 443 : null,
            };

            user.verify(options, function (err, response) {
                // console.log(user.verificationToken);
                if (err) {
                    User.deleteById(user.id);
                    return next(err);
                }
            });
            //Pasi te krijohet user i ri (nga admin, root, ose veteRegjistrim) shiko nese i eshte percaktuar ndonje role
            //Nese jo caktoi automatikisht rolin client. 
            if (!user.role) {
                const Roles = app.models.Role;
                Roles.findOne({ where: { name: "client" } }, function (err, role) {
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
    Amuser.beforeRemote('login', function (ctx, modelInstance, next) {
        Amuser.findOne({ where: { "username": ctx.req.body.username } }, function (err, perdorues) {
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
    Amuser.on('resetPasswordRequest', function (info) {
        gjejOrg().then(function (org) {
            let data = {
                org: org,
                user: info.user,
                url: (process.env.NODE_ENV == "production") ? "https://" + org.domain + "/reset?access_token=" + info.accessToken.id : "http://localhost:4200/reset?access_token=" + info.accessToken.id,
            }
            var renderer = loopback.template(path.resolve(__dirname, '../../templates/resetpass.ejs'));
            var html = renderer(data);
            Amuser.app.models.Email.send({
                to: info.email,
                from: "noreply@" + org.domain,
                subject: org.orgname + " - Reset Fjalëkalimin",
                html: html,
                user: info.user
            })
        }).catch(function (err) {
            console.log(err);
        })
    })
    //GjejOrg synchronously. 
    function gjejOrg() {
        return new Promise(function (resolve, reject) {
            const orgs = app.models.org;
            orgs.findOne({}, function (err, org) {
                if (err) reject(err)
                resolve(org)
            })

        })
    }
};
