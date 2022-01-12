// @see https://github.com/garris/BackstopJS

// Get URLs.
const liveURL = process.env.LIVE_SITE_URL.replace(/\/$/, "");
const multidevURL = process.env.MULTIDEV_SITE_URL.replace(/\/$/, "");
const site = process.env.SITE;
const phone = {
  name: "phone",
  width: 320,
  height: 480,
};
const desktop = {
  name: "desktop",
  width: 1920,
  height: 1080,
};
const desktopShort = {
  name: "desktopShort",
  width: 1220,
  height: 500,
};

// Define default test.
// Get paths. cd ~/Sites/covid10/docs && ls -d */| pbcopy
let pathsToTest = [
  "",
  "2021/12/06/cannabis-advisory-committee-meeting/index.html",
  "resources/rulemaking/index.html",
  "2021/12/21/department-of-cannabis-control-files-emergency-regulations-for-equity-fee-waivers-public-comment-period-begins-today/index.html",
  "2021/12/21/californias-cannabis-department-seeks-members-for-cannabis-advisory-committee/index.html",
  "about-us/dcc-events/index.html",
  "serp/index.html?q=cannabis",
  "about-us/announcements/index.html",
 ];

let clickSelectorsToTest = [];
let keyPressSelectorsToTest = [];
let hoverSelectorsToTest = [];
let viewportsToTest = [phone, desktop];
let readySelectorToTest = "body";

// -------------
// Define scenario.
let scenariosToTest = [];
for (const value of pathsToTest) {
  scenariosToTest.push({
    label: value,
    url: multidevURL + "/" + value,
    referenceUrl: liveURL + "/" + value,
    hideSelectors: [],
    removeSelectors: [],
    keyPressSelectors: keyPressSelectorsToTest,
    readySelector: readySelectorToTest,
    hoverSelectors: hoverSelectorsToTest,
    clickSelectors: clickSelectorsToTest,
    selectorExpansion: true,
    selectors: ["body"],
    readyEvent: null,
    delay: 7000,
    misMatchThreshold: 0.1,
  });
}

// Put it all together.
module.exports = {
  id: site,
  viewports: viewportsToTest,
  scenarios: scenariosToTest,
  paths: {
    bitmaps_reference: "backstop_data/bitmaps_reference",
    bitmaps_test: "backstop_data/bitmaps_test",
    engine_scripts: "backstop_data/engine_scripts",
    html_report: "backstop_data/html_report",
    ci_report: "backstop_data/ci_report",
  },
  report: ["browser", "CI"],
  engine: "puppeteer",
  engineOptions: {
    args: ["--no-sandbox"],
  },
  onReadyScript: "puppet/onReady.js",
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};
