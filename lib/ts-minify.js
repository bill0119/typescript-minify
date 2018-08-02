/**
 * Created by bill on 2018/08/02.
 */

"use strict";

let path = require('path');
let fs = require('fs');
let exec = require('child_process').exec;
let uglifyES = require('uglify-es');

let tsc = (name, files, moduleBinFolder, cb) => {
    let cmd = 'tsc ';
    for (let i = 0; i < files.length; ++i) {
        cmd += files[i] + ' ';
    }

    let out = path.join(moduleBinFolder, name) + '.js'
    cmd += '-out ' + out;

    exec(cmd, function(err, info, standarInfo){
        if(err) {
            if(cb) cb(err);
            return;
        }

        if(cb) cb();
    });
};

let minify = (moduleJsPath, moduleMinJsPath, cb) => {
    let result = uglifyES.minify(fs.readFileSync(moduleJsPath).toString());
    if(result.error) return cb(result.error);
    fs.writeFileSync(moduleMinJsPath, result.code);

    if(cb) cb();
};

let loadModule = (root, o) => {
    //check module list
    let fileList = [];
    if (o.hasOwnProperty('file')) {
        for (let i = 0; i < o.file.length; ++i) {
            if (fs.existsSync(path.join(root, o.file[i]))) {
                fileList.push(path.join(root, o.file[i]));
            }
        }
    } else {
        throw 'module file does not have file';
    }

    return fileList;
};

let loadName = (root, o) => {
    //check module name
    let name = '';
    if (o.hasOwnProperty('name')) {
        name = o.name;
    } else {
        throw 'module file does not have file';
    }

    return name;
};

exports.build = (root, moduleJSON) => {
    let d = fs.readFileSync(path.join(process.cwd(), moduleJSON), 'ASCII');
    let o = {};
    try {
        o = JSON.parse(d);
    } catch(e) {
        throw 'module file error ' + moduleJSON;
    }

    let files = loadModule(root, o);
    let name = loadName(root, o);

    for (let i = 0; i < files.length; ++i) {
        console.log('compile file : ' + files[i]);
    }

    //check build folder
    let moduleBinFolder = path.join(process.cwd(), 'bin');
    try {
        fs.accessSync(moduleBinFolder)
    } catch(e) {
        console.log('create binary folder');
        fs.mkdirSync(moduleBinFolder);
    }

    tsc(name, files, moduleBinFolder, (err) => {
        if (err) {
            throw 'compile typescript error ' + err;
        } else {
            console.log('compile typescript done.');

            let moduleJsPath = path.join(moduleBinFolder, name) + '.js';
            // export module
            let expStr = 'exports.' + name + '=' + name + ';';
            fs.appendFileSync(moduleJsPath, expStr);

            let moduleMinJsPath = path.join(moduleBinFolder, name) + '.min.js';
            minify(moduleJsPath, moduleMinJsPath, () => {
                console.log('minify done');
            });
        }
    });
};
