const fetch = require('node-fetch')
const flatten = require('obj-flatten')
const fs = require('fs')
const JsonToCsvParser = require('json2csv').Parser

const gsaCodeJson = {
  gsa: 'https://open.gsa.gov/code.json',
  dot: 'https://www.transportation.gov/code.json',
  nasa: 'https://code.nasa.gov/code.json'
}

function getCodeJson(url) {
  return fetch(url)
    .then(response => response.json())
}

function flattenObject(obj) {
  return flatten(obj)
}

function getScore(flattenedRepo) {
  const fields = {
    "name": 1,
    "description": 1,
    "permissions.licenses": 1,
    "permissions.licenses.URL": 1,
    "permissions.licenses.name": 1,
    "permissions.usageType": 1,
    "permissions.exemptionText": 1,
    "organization": 1,
    "contact.email": 1,
    "contact.name": 1,
    "contact.URL": 1,
    "contact.phone": 1,
    "tags": 1,
    "laborHours": 1,
    "languages": 0.8,
    "repositoryURL": 0.8,
    "homepageURL": 0.8,
    "downloadURL": 0.8,
    "vcs": 0.8,
    "date.created": 0.6,
    "date.lastModified": 0.6,
    "date.metadataLastUpdated": 0.6,
    "version": 0.6,
    "status": 0.6,
    "disclaimerURL": 0.4,
    "disclaimerText": 0.4,
    "relatedCode.name": 0.4,
    "relatedCode.URL": 0.4,
    "reusedCode.name": 0.4,
    "reusedCode.URL": 0.4,
    "partners.name": 0.4,
    "partners.email": 0.4,
    "target_operating_systems": 0.2,
    "additional_information": 0.1
  }
  let score = 0

  Object.keys(flattenedRepo).forEach(key => {
    score += fields[key]
      && flattenedRepo[key] !== null
      && flattenedRepo[key] !== undefined
      && flattenedRepo[key] !== ''
        ? fields[key]
        : 0
  })
  
  return score
}

getCodeJson(gsaCodeJson.dot)
  .then(codeJson => {
    return codeJson.releases.map(repo => {
      const flattenedRepo = flattenObject(repo)
      return {
        repo,
        flattenedRepo
      }
    })
  })
  .then(data => {
    return data.map(item => {
      const repo = item.repo
      const score = getScore(item.flattenedRepo)
      repo.score = score

      return repo
    })
  })
  .then(repos => {
    const parser = new JsonToCsvParser()
    const reposForFile = repos.map(repo => flattenObject(repo))
    const csv = parser.parse(reposForFile)

    fs.writeFile('scoredRepos.csv', csv, error => {
      if(error) {
        console.error(error)
      }
    })
  })
  .catch(error => console.error(error))
