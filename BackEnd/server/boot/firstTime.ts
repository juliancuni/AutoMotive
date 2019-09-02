module.exports = function (app: any) {
    let Ndermarrje = app.models.Ndermarrje;
    let perdorues = app.models.Perdorues;
    let Role = app.models.Role;
    let RoleMapping = app.models.RoleMapping;
    let ACL = app.models.ACL;
    
    Ndermarrje.findOne((err: any, ndermarrje: any) => {
        if (err) console.log("err: " + err);
        if (!ndermarrje) {
            console.log("\x1b[32m", "\n\nDuket se kjo eshte hera e pare qe ky program starton.\n")
            console.log('\x1b[36m%s\x1b[0m', "Ju lutem protesoni te dhenat me poshte\n\n")
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            //Lista e modeleve Array[];
            var modelNames = Object.keys(app.models);

            //Pyetesori per te dhenat e Ndermarrjes dhe user root.

            //callback hell
            rl.question('Emri i Ndermarrjes? ', (ndermarrjaemer: string) => {
                rl.question('Domain i Ndermarrjes? ', (domain: string) => {
                    rl.question('Root user. \nShkruaj email ', (rootEmail: string) => {
                        rl.question('Shkruaj password ', (rootPass: string) => {
                            if (ndermarrjaemer == '' || domain == '' || rootEmail == '' || rootPass == '') {
                                console.log("\x1b[31m", "Asnje nga kerkesat nuk duhet lene bosh. Provoni serish");
                                process.exit(0);
                            } else {
                                Ndermarrje.create({ emer: ndermarrjaemer, domain: domain }, (err: any, ndermarrje: any) => {
                                    if (err) console.log(err)
                                    console.log("ndermarrja u krijua")
                                    perdorues.create({
                                        username: "root",
                                        emer: "Root",
                                        mbiemer: "User",
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
                                                console.log("roli principal root u krijua")
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
                                                    modelNames.forEach((model: string) => {
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
                                                    ACL.create({
                                                        principalType: ACL.ROLE,
                                                        principalId: "$everyone",
                                                        model: "Ndermarrje",
                                                        property: "findOne",
                                                        accessType: "READ",
                                                        permission: ACL.ALLOW
                                                    }, (err: any, acl: any) => {
                                                        if (err) console.log(err)
                                                        console.log(`ACL model: Ndermarrje : ALLOW $everyone findOne u krijua`)
                                                    })
                                                    Role.create({
                                                        name: "klient",
                                                        description: "klient role. Nuk ka shume te drejta"
                                                    }, (err: any, role: any) => {
                                                        if (err) console.log(err);
                                                        console.log(`\n\nFinal: u krijua role ${role.name}`);
                                                        console.log("\x1b[32m", "\n\nProcedura u zbatua me sukses. Mund te vazhdoni te veproni nga web/mobile/desktop app.")
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            }; // callback hell
                        });
                    });
                });
            });
        };
    });
};