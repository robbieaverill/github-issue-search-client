const request = require('request');
const fs = require('fs');
const path = require('path');

const URL = 'https://raw.githubusercontent.com/silverstripe/supported-modules/gh-pages/modules.json';
const coreRepos = [
  'silverstripe/silverstripe-asset-admin',
  'silverstripe/silverstripe-assets',
  'silverstripe/silverstripe-config',
  'silverstripe/silverstripe-framework',
  "silverstripe/silverstripe-admin",
  "silverstripe/silverstripe-asset-admin",
  "silverstripe/silverstripe-campaign-admin",
  "silverstripe/silverstripe-cms",
  "silverstripe/silverstripe-errorpage",
  "silverstripe/silverstripe-graphql",
  "silverstripe/silverstripe-reports",
  "silverstripe/silverstripe-siteconfig",
  "silverstripe/silverstripe-versioned-admin",
  "silverstripe/silverstripe-versioned"
];
request(URL, function (error, response, body) {
  const modules = JSON.parse(body);
  const repos = modules.filter(module => module.type === 'supported-module').map(module => module.github);
  const out = [
    {
      id: 'core',
      name: 'Core',
      repos: repos.filter(repo => coreRepos.indexOf(repo) > -1)
    },
    {
      id: 'supported',
      name: 'Supported',
      repos: repos.filter(repo => !coreRepos.indexOf(repo) > -1)
    }
  ];

  fs.writeFile(path.join(__dirname, '../src/') + '/repos.json', JSON.stringify(out), function(err, data) {
    if (err) {
      return console.log(error);
    }
    console.log('Successfully written to file "src/repos.json"');
  });
});
