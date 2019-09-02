'use strict';

module.exports = function (Menu) {
    var app = require('../../server/server');
    Menu.beforeRemote('find', function (ctx, empty, next) {

        let perdoruesId = ctx.req.accessToken.userId;
        let acls, appModels, menuteLejuara;

        gjejRoletNgaPerdoruesById(perdoruesId)
            .then((perdorues) => {
                return gjejAclNgaRoletQeKaPerdoruesId(perdorues);
            }).then((acl) => {
                acls = acl;
                return gjejAppModels();
            }).then((models) => {
                appModels = models;
                return gjejMenute();
            }).then((menute) => {
                return krijoMenu(appModels, acls, menute);
            }).then((menuteLej) => {
                menuteLejuara = menuteLej;
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                ctx.res.send(menuteLejuara);
            });
    });

    let gjejRoletNgaPerdoruesById = ((userId) => {
        return new Promise((resolve, reject) => {
            let perdorues = app.models.Perdorues;
            perdorues.findById(userId, { include: 'rolet' }, function (err, perdorues) {
                if (err) reject(err);
                var perdorues = perdorues.toJSON();
                resolve(perdorues);
            })
        })
    })

    let gjejAclNgaRoletQeKaPerdoruesId = ((perdorues) => {
        return new Promise((resolve, reject) => {
            let acl = app.models.ACL;
            perdorues.rolet.forEach((role) => {
                acl.find({
                    where: { or: [{ principalId: perdorues.id }, { principalId: role.name }], and: [{ permission: "ALLOW" }] }
                }, function (err, acl) {
                    if (err) reject(err);
                    resolve(acl);
                })
            })
        })
    })

    let gjejAppModels = (() => {
        return new Promise((resolve, reject) => {
            let modelNames = Object.keys(app.models);
            resolve(modelNames)
        })
    })

    let gjejMenute = (() => {
        return new Promise((resolve, reject) => {
            Menu.find((err, menute) => {
                if (err) reject(err);
                resolve(menute);
            })
        })
    })

    let krijoMenu = ((appModels, acls, menute) => {
        return new Promise((resolve, reject) => {
            let menuteLejuara = [];
            appModels.forEach((appModel) => {
                acls.forEach((acl) => {
                    if (appModel === acl.model) {
                        menute.forEach((menu) => {
                            if (!menu.protected) {
                                menuteLejuara.push(menu);
                            }
                            if (menu.text === acl.model) {

                                menuteLejuara.push(menu);
                            }
                        })
                    }
                })
            })
            menuteLejuara = [... new Set(menuteLejuara)];
            menuteLejuara.sort((a, b) => {
                return a.index > b.index;
            })
            resolve(menuteLejuara);
        })
    })
};
