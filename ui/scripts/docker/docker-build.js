const angularJSON = require('../../angular.json');
const version = require('../version.js');
const sh = require('shelljs');

const imageName = angularJSON.defaultProject;

sh.exec(`docker build -f Dockerfile -t ${imageName}:latest -t ${imageName}:${version} .`);
