#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const colors = require('colors');
const defaultsDeep = require('lodash/defaultsDeep');
const minimist = require('minimist');
const assert = require('assert');
const isUndefined = require('lodash/isUndefined');
const isObject = require('lodash/isObject');
const env = process.env;

var args, argv;
if (isUndefined(env.npm_config_argv)) {
  argv = process.argv;
  args = minimist(argv.slice(2));
} else {
  argv = JSON.parse(process.env.npm_config_argv).original;
  args = minimist(argv.slice(2));
}

// check if source was defined in run params
assert(!isUndefined(args.src), '--src was not defined!');

// check if source file exists and is a JSON file
const src = path.resolve(args.src);
assert(fileExists(src), `${src} is not a file!`);
assert(isJsonFileValid(src), `${src} is not a valid JSON file!`);

// check if destination file is in run params
assert(!isUndefined(args.dest), '--dest was not defined!');
assert(isObject(args.params), '--params was not defined!');

const dest = path.resolve(args.dest);
const json = defaultsDeep(args.params, getJsonContent(src));

// write dest to file
fs.writeFileSync(dest, JSON.stringify(json, null, 2));
console.log(`Successfully merged to ${colors.green(dest)} file`);

/**
 * @param {string} destination
 * @returns {boolean}
 */
function fileExists(destination) {
  try {
    return fs.statSync(destination).isFile();
  } catch (e) {
    return false;
  }
}

/**
 * @param {string} destination
 * @returns {boolean}
 */
function isJsonFileValid(destination) {
  try {
    return isObject(getJsonContent(destination));
  } catch (e) {
    return false;
  }
}

/**
 * @param {string} destination
 * @returns {Object}
 */
function getJsonContent(destination) {
  return JSON.parse(fs.readFileSync(destination).toString());
}