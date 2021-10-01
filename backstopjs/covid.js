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
  "404/",
  "410-page/",
  "410/",
  "500/",
  // "ar/",
  "business-and-employers/",
  // "card-design-feature/",
  // "chart-renderer/",
  // "chart-tester/",
  "contracts/",
  // "css/",
  "data-and-tools/",
  "discrimination/",
  "dream-vacations-terms/",
  "education/",
  "emergency-broadband/",
  "equity/",
  // "es/",
  "essential-workforce/",
  // "fonts/",
  "food-resources/",
  "get-financial-help/",
  "get-local-information/",
  "get-tested/",
  "housing-for-agricultural-workers/",
  // "img/",
  "industry-guidance-search/",
  // "js/",
  // "ko/",
  "masks-and-ppe/",
  "mega-events/",
  "resources-for-emotional-support-and-well-being/",
  "safely-reopening/",
  "sample/",
  "search/",
  "sign-up-for-county-alerts/",
  "state-dashboard/",
  "tableau-testing/",
  // "tl/",
  "translate/",
  "travel/",
  "v3-state-dashboard/",
  "v4-state-dashboard/",
  "vaccination-progress-data/",
  "vaccines-live-chat-test/",
  "vaccines/",
  "variants/",
  "vax-for-the-win-six-flags/",
  "vax-for-the-win/",
  // "vi/",
  "what-is-open-where/",
  "workers-and-businesses/",
  // "zh-hans/",
  // "zh-hant/",
];

let clickSelectorsToTest = [];
let keyPressSelectorsToTest = [];
let hoverSelectorsToTest = [];
let viewportsToTest = [phone, desktop];
let readySelectorToTest = "main";

// ---------
// Interactive test
// Modify default settings
if (process.env.TEST_TYPE == "interactive") {
  pathsToTest = ["vaccines/"];
  clickSelectorsToTest = [".dropdown-toggle"];
  hoverSelectorsToTest = [".expanded-menu-search-form"];
  viewportsToTest = [desktopShort];
}

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
    selectors: ["main"],
    readyEvent: null,
    delay: 3000,
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
