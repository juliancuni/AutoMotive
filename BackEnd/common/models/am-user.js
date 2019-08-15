'use strict';

module.exports = function (Amuser) {

    // const senderAddress = 'noreply@microservices.al';
    const app = require('../../server/server');

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
                orgs.findOne({}, function(err, org) {
                    if (err) console.log(err)
                    res.redirect('https://' + org.domain + '/tokenExpired');
                })
                
            }
        })
    })
    //Pasi user eshte regjistruar dergo email per konfirmim
    Amuser.afterRemote('create', function (context, user, next) {
        const orgs = app.models.org;
        orgs.findOne({}, function (err, org) {
            if (err) console.log(err)
            var options = {
                type: 'email',
                to: user.email,
                from: 'noreply@' + org.domain,
                subject: 'Verifikim ' + org.orgname,
                headers: { 'Mime-Version': '1.0' },
                template: './templates/verify.ejs',
                redirect: org.domain +'/verifikim/?uid=' + user.id,
                user: user,
                org: org,
                host: org.domain,
                protocol: 'https',
                port: 443
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
        })
        next();
    });
};
