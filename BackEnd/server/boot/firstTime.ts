module.exports = function (app: any) {
    let Org = app.models.Org;
    let amUser = app.models.amUser;
    let Role = app.models.Role;
    let RoleMapping = app.models.RoleMapping;
    let ACL = app.models.ACL;

    Org.findOne((err: any, org: any) => {
        if (err) console.log("err: " + err);
        if (!org) {
            console.log("\x1b[32m", "\n\nDuket se kjo eshte hera e pare qe ky program starton.\n")
            console.log('\x1b[36m%s\x1b[0m', "Ju lutem protesoni te dhenat me poshte\n\n")
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            //Lista e modeleve Array[];
            var modelNames = Object.keys(app.models);
            var models: any = [];

            modelNames.forEach((m) => {
                var modelName = app.models[m].modelName;
                if (models.indexOf(modelName) === -1) {
                    // console.log(modelName.toUpperCase())
                    models.push(modelName);
                }
            });

            //Pyetesori per te dhenat e organizates dhe user root.
            rl.question('Emri i organizatës? ', (orgName: string) => {
                rl.question('Domain i organizates? ', (domain: string) => {
                    rl.question('Root user. Shkruaj email ', (rootEmail: string) => {
                        rl.question('Root user. Shkruaj password ', (rootPass: string) => {
                            rl.question('Root user. Konfirmo password ', (rootConfirmPass: string) => {
                                if (orgName == '' || domain == '' || rootEmail == '' || rootPass == '' || rootConfirmPass == '') {
                                    console.log("\x1b[31m", "Asnje nga kerkesat nuk duhet lene bosh. Provoni serish");
                                    process.exit(0);
                                } else if (rootPass != rootConfirmPass) {
                                    console.log("\x1b[31m", "Fjalekalimi dhe konfirmimi nuk jane njelloj. Provoni serish");
                                    process.exit(0);
                                } else {
                                    Org.create({ orgname: orgName, domain: domain }, (err: any, org: any) => {
                                        if (err) console.log(err)
                                        console.log("Org u krijua")
                                        amUser.create({
                                            username: "root",
                                            name: "root",
                                            email: rootEmail,
                                            password: rootPass,
                                            emailVerified: true,
                                        }, (err: any, user: any) => {
                                            if (err) console.log(err)
                                            console.log("Root user u krijua")
                                            Role.create({
                                                name: "root",
                                                description: "Ma i madhi n'ven"
                                            }, (err: any, role: any) => {
                                                if (err) console.log(err)
                                                console.log("Root role u krijua")
                                                role.principals.create({
                                                    principalType: RoleMapping.USER,
                                                    principalId: user.id
                                                }, (err: any, pricipal: any) => {
                                                    if (err) console.log(err)
                                                    console.log("Role principal root u krijua")
                                                    ACL.create({
                                                        principalType: ACL.ROLE,
                                                        principalId: '$everyone',
                                                        model: ACL.ALL,
                                                        property: ACL.ALL,
                                                        accessType: ACL.ALL,
                                                        permission: ACL.DENY
                                                    }, (err: any, acl: any) => {
                                                        if (err) console.log(err)
                                                        console.log("ACL Everyone Deny u krijua")
                                                        models.forEach((model: string) => {
                                                            ACL.create({
                                                                principalType: ACL.ROLE,
                                                                principalId: role.name,
                                                                model: model,
                                                                property: ACL.ALL,
                                                                accessType: ACL.ALL,
                                                                permission: ACL.ALLOW
                                                            }, (err: any, acl: any) => {
                                                                if (err) console.log(err)
                                                                console.log(`ACL model: ${model} : ALLOW root u krijua`)
                                                            })
                                                        })
                                                    });
                                                })
                                            })
                                        })
                                    }) 
                                } // callback hell
                            })
                        })
                    })
                })
            });
        }
    })
};