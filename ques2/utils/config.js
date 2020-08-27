const fs = require('fs');
const path = require('path');

// deploymentConfig.json contains deployment config variables
const configJSON = fs.readFileSync(path.resolve(__dirname, '..', 'configuration.json'), 'utf8');
let config = JSON.parse(configJSON);

module.exports = config;
