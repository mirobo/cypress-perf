const cypress = require('cypress');
const glob = require('glob');
const Promise = require('bluebird');
const fs = require('fs');
require('console.table');

const runOneSpec = (spec, config) => {
  return cypress
    .run({
      config: {
        video: false,
        ...config,
      },
      spec: spec,
    })
    .then((result) => {
      if (result.failures) {
        console.error('Could not execute tests');
        console.error(result.message);
        process.exit(1); // abort testrun fast
      }
      return result;
    })
    .catch((err) => {
      console.error(err.message);
      // process.exit(1);
    });
};

glob('**/*in*spec.js', (err, specs) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  console.table('Running last modified spec first', specs);

  var configs = [
    {
      env: {
        NO_COMMAND_LOG: 1,
      },
    },
    {
      env: {
        NO_COMMAND_LOG: 0,
      },
    },
  ];
  configs.forEach((config) => {
    Promise.mapSeries(specs, (specs) => runOneSpec(specs, config)).then((runResults) => writeReport(runResults, config));
  });
});

function writeReport(runResults, config) {
  // information about each test run is available
  // see the full NPM API declaration in
  // https://github.com/cypress-io/cypress/tree/develop/cli/types
  const summary = runResults.map((run) => {
    var firstRun = run.runs ? run.runs[0] : {};
    var runReport = {
      spec: firstRun.spec.name,
      totalDuration: run.totalDuration,
      reporterDuration: firstRun.reporterStats.duration,
      runStatsDuration: firstRun.stats.duration,
      browserName: run.browserName,
      browserVersion: run.browserVersion,
      osName: run.osName,
      //   osVersion: run.osVersion,
      cypressVersion: run.cypressVersion,
      video: run.config.video,
      report: run.config.report,
      resolvedNodeVersion: run.config.resolvedNodeVersion,
      noCommandLog: run.config.env.NO_COMMAND_LOG,
      //   config: JSON.stringify(config, null, 2),
    };
    //console.log(runReport);
    return runReport;
  });

  var overallDuration = summary.reduce((total, curr) => total + curr.totalDuration, 0);

  const shortSummary = {
    cypressVersion: summary[0].cypressVersion,
    browserName: summary[0].browserName,
    browserVersion: summary[0].browserVersion,
    osName: summary[0].osName,
    resolvedNodeVersion: summary[0].resolvedNodeVersion,
    overallDuration,
    video: summary[0].video,
    noCommandLog: summary[0].noCommandLog,
  };

  console.log('Short summary', shortSummary);
  var fileName = `run-stats.csv`;
  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, csvHeader(shortSummary));
  }
  fs.appendFileSync(fileName, csvContent(shortSummary));
  // fs.appendFileSync(`run-stats.csv`, csvHeader(summary));
  // fs.writeFileSync(
  //   `logs/cypress(${cypressVersion})-video(${video})-commandlog(${commandLog})-duration(${overallDuration})-${new Date().getTime()}.log`,
  //   JSON.stringify(summary, null, 2)
  // );
}

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

// function csvHeader(array) {
//   // Use first element to choose the keys and the order
//   var keys = Object.keys(array[0]);

//   // Build header
//   var result = keys.join(',') + '\r\n';

//   return result;
// }

// function csvContent(array) {
//   // Use first element to choose the keys and the order
//   var keys = Object.keys(array[0]);
//   var result = '';
//   // Add the rows
//   array.forEach(function (obj) {
//     result += keys.map((k) => `${obj[k]}`).join(',') + '\r\n';
//     // result += keys.map((k) => `"${(obj[k] + '').replace(/"/g, '""')}"`).join(',') + '\r\n';
//   });
//   return result;
// }
