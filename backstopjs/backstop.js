// Get environment variables from ./.env
require("dotenv").config();

const site = process.env.SITE;

// Get Backstop configuration.
// const backstopconfig = require('./backstopVaccineConfig.js');
const backstopconfig = require(`./${site}.js`);

// Make config available to other js.
module.exports = backstopconfig;
