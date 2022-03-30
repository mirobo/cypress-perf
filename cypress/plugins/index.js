/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const fs = require('fs');
// import * as fs from('fs');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('after:run', (results) => {
    var info = {
      cypressVersion: config.cypressVersion,
      version: config.version,
      nodeVersion: config.nodeVersion,
      browserVersion: results.browserVersion,
      totalDuration: results.totalDuration,
      config: config,
      results: results,
    };
    console.log(info);
    // fs.writeFileSync(`${config.cypressVersion}-${new Date().getTime()}-${results.totalDuration}.log`, JSON.stringify(info));

    // var overallDuration = summary.reduce((total, curr) => total + curr.totalDuration, 0);
    var overallDuration = results.totalDuration;

    const shortSummary = {
      cypressVersion: results.cypressVersion,
      browserName: results.browserName,
      browserVersion: results.browserVersion,
      osName: results.osName,
      resolvedNodeVersion: config.resolvedNodeVersion,
      overallDuration,
      video: config.video,
      noCommandLog: config.env.NO_COMMAND_LOG,
    };

    // tests with numTestsKeptInMemory:

    console.log('Short summary', shortSummary);
    var fileName = `run-stats-with-npx-run.csv`;
    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, csvHeader(shortSummary));
    }
    fs.appendFileSync(fileName, csvContent(shortSummary));
  });
};

function csvHeader(obj) {
  // Use first element to choose the keys and the order
  var keys = Object.keys(obj);

  // Build header
  var result = keys.join(',') + '\r\n';

  return result;
}

function csvContent(obj) {
  // Use first element to choose the keys and the order
  var keys = Object.keys(obj);
  var result = '';
  // Add the rows
  result += keys.map((k) => `${obj[k]}`).join(',') + '\r\n';
  return result;
}
