/**
 * Created by bill on 2017/12/30.
 */

let path = require('path');
let build = require('../lib/ts-minify.js');
let root = path.join(process.cwd(), 'src');
let m = 'module.json';

build.build(root, m);
