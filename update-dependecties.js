const path = require('path');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);
const exec = require('child_process').exec;

let pathToUpdate;

process.argv.forEach(element => {
    switch (element) {
        case "FrontEnd":
            pathToUpdate = path.join(__dirname, element);
            break;
        case "BackEnd":
            pathToUpdate = path.join(__dirname, element);
            break;
        case "FileServer":
            pathToUpdate = path.join(__dirname, element);
            break;
        default:
            break;
    }
});

const updateDependencies = async (path2update) => {
    if (path2update) {
        let depRaw = fs.readFileSync(path2update + "/package.json", 'utf8')
        const nodesFolder = path2update + "/node_modules";
        const packageLock = path.join(path2update, "package-lock.json");
        // console.log(packageLock)
        depRaw = JSON.parse(depRaw);
        let dependecies = depRaw.dependencies;
        let devDependecies = depRaw.devDependencies;
        if (fs.existsSync(nodesFolder)) {
            await removeDir(nodesFolder);
            console.log("Done removing node_modules")
        } else {
            console.log("node_modules folder does not exist. Continue with updating packages @latest versions")
        }
        if (fs.existsSync(packageLock)) {
            await unlink(packageLock);
        }
        let npmInstaSave = `cd "${path2update}" &&  npm install --save `;
        let npmInstaSaveDev = `cd "${path2update}" &&  npm install --save-dev `;
        Object.keys(dependecies).forEach((key, value) => {
            npmInstaSave += key + '@latest ';
        })
        Object.keys(devDependecies).forEach((key, value) => {
            npmInstaSaveDev += key + '@latest ';
        })
        console.log("=======================Dependecies=======================")
        console.log(npmInstaSave)
        console.log(" && ")
        console.log(npmInstaSaveDev)
    } else {
        console.log("Define PAth")
    }
};

const removeDir = async (dir) => {
    try {
        const files = await readdir(dir);
        await Promise.all(files.map(async (file) => {
            try {
                console.log("Removing node_modules folder")
                const p = path.join(dir, file);
                const stat = await lstat(p);
                if (stat.isDirectory()) {
                    await removeDir(p);
                } else {
                    await unlink(p);
                }
            } catch (err) {
                console.error(err);
            }
        }))
        await rmdir(dir);
    } catch (err) {
        console.error(err);
    }
}

updateDependencies(pathToUpdate);
