'use strict';

module.exports = function (Amuser) {

    const senderAddress = 'noreply@microservices.al';
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
                res.redirect('https://microservices.al/tokenExpired');
            }
        })
    })
    //Pasi user eshte regjistruar dergo email per konfirmim
    Amuser.afterRemote('create', function (context, user, next) {
        var options = {
            type: 'email',
            to: user.email,
            from: senderAddress,
            subject: 'Verifikim emaili - MSA',
            headers: { 'Mime-Version': '1.0' },
            template: './templates/verify.ejs',
            redirect: 'https://microservices.al/verifikim/?token=' + user.id,
            user: user,
            host: 'localhost',
            protocol: 'http',
            port: 3000
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
                    if(err) next(err)
                    console.log(principal);
                })
            })
        }
        next();
    });
};
