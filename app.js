const fetch = require('node-fetch');
const flatten = require('obj-flatten');
const fs = require('fs');
const JsonToCsvParser = require('json2csv').Parser;
const getRules = require('./rules');
const RulesEngine = require('simple-rules-engine');


const codeJsons = {
  gsa: 'https://open.gsa.gov/code.json',
  dot: 'https://www.transportation.gov/code.json',
  nasa: 'https://code.nasa.gov/code.json'
};

function getCodeJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function flattenObject(obj) {
  return flatten(obj);
}

async function getScoredRepo(flattenedRepo) {
  const engine = new RulesEngine(getRules());
  const scoredRepo = await engine.execute(flattenedRepo);

  return scoredRepo;
}

Object.keys(codeJsons).map(key => {
  console.log(`Getting ${key.toUpperCase()} Code.json`)
  getCodeJson(codeJsons[key])
    .then(codeJson => {
      console.log(`Returning ${key.toUpperCase()} releases`);
      return codeJson.releases;
    })
    .then(repos => {
      console.log(`Getting repo scores for ${repos.length} ${key.toUpperCase()} repos`);
      return Promise.all(
        repos.map(repo => getScoredRepo(repo))
      ).catch(error => console.error(error));
    })
    .then(repos => {
      const parser = new JsonToCsvParser();
      const reposForFile = repos.map(repo => flattenObject(repo));
      const csv = parser.parse(reposForFile);

      console.log('Generating scoredRepos.csv file.');
      fs.writeFile('scoredRepos.csv', csv, error => {
        if(error) {
          console.error(error);
        }
      })
    })
    .catch(error => console.error('[ERROR] - ', error));
});
