const angularJSON = require('../../angular.json');
const sh = require('shelljs');

const imageName = angularJSON.defaultProject;
const isRunning = sh.exec(`docker ps -a -q -f name=${imageName}`, { silent: true }).stdout;
const PORT = '4300';

if (isRunning) {
  sh.exec(`docker rm -f ${imageName}`);
}

sh.exec(`docker run -d -t --name ${imageName} \
 -e FUND_MANAGER_URL="http://192.168.1.60:9081" \
 -e BLOCK_CHAIN_URL="http://vmfalcon.southindia.cloudapp.azure.com:8080/api" \
 -e INVESTOR_URL="http://192.168.1.60:8081" \
 -p ${PORT}:80  ${imageName}:latest .`);
sh.exec(`docker ps`);

console.log(`\n\n### INFO: ${imageName} is running at:\n\n\thttp://localhost:${PORT}\n`);
