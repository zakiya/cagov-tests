import template from "./../common/histogram-template.js";
import chartConfig from '../common/line-chart-config.json';
import getTranslations from "../../../common/get-strings-list.js";
import getScreenResizeCharts from "../../../common/get-window-size.js";
import rtlOverride from "../../../common/rtl-override.js";
import renderChart from "../common/histogram.js";
import { reformatReadableDate, getSnowflakeStyleDate, getSnowflakeStyleDateJS, parseSnowflakeDate } from "../../../common/readable-date.js";
import applySubstitutions from "./../../../common/apply-substitutions.js";
import formatValue from "./../../../common/value-formatters.js";

// cagov-chart-dashboard-icu-beds
class CAGovDashboardICUBeds extends window.HTMLElement {
  connectedCallback() {
    console.log("Loading CAGovDashboardICUBeds");
    this.translationsObj = getTranslations(this);
    this.chartConfigFilter = this.dataset.chartConfigFilter;
    this.chartConfigKey = this.dataset.chartConfigKey;

    // Settings and initial values
    this.chartOptions = chartConfig[this.chartConfigKey][this.chartConfigFilter];

    getScreenResizeCharts(this);

    this.screenDisplayType = window.charts
      ? window.charts.displayType
      : "desktop";
    // console.log("this.screenDisplayType",this.screenDisplayType);

    this.chartBreakpointValues = chartConfig[
      this.screenDisplayType ? this.screenDisplayType : "desktop"
    ];
    this.chartBreakpointValues = JSON.parse(JSON.stringify(this.chartBreakpointValues));
    this.dimensions = this.chartBreakpointValues;
    this.dimensions.margin.right = 20;

    const handleChartResize = () => {
      getScreenResizeCharts(this);
      this.screenDisplayType = window.charts
        ? window.charts.displayType
        : "desktop";
      this.chartBreakpointValues = chartConfig[
        this.screenDisplayType ? this.screenDisplayType : "desktop"
      ];
    };

    window.addEventListener("resize", handleChartResize);

    // Set default values for data and labels
    this.dataUrl = config.chartsStateDashTablesLoc + this.chartOptions.dataUrl;

    this.retrieveData(this.dataUrl, 'California');

    rtlOverride(this); // quick fix for arabic

    this.listenForLocations();
  }

  ariaLabel(d, baselineData) {
    let caption = ''; // !!!
    return caption;
  }

  getLegendText() {
    return [];
    //   this.translationsObj.chartLegend1,
    //   this.translationsObj.chartLegend2,
    // ];
  }

  renderExtras(svg, data, x, y) {
  }

  getTooltipContent(di) {
    const barSeries = this.chartdata.time_series[this.chartOptions.seriesField].VALUES;
    const lineSeries = this.chartdata.time_series[this.chartOptions.seriesFieldAvg].VALUES;
    // console.log("getTooltipContent",di,lineSeries);
    const repDict = {
      DATE:   reformatReadableDate(barSeries[di].DATE),
      VALUE:formatValue(barSeries[di].VALUE,{format:'integer'}),
    };
    return applySubstitutions(this.translationsObj.tooltipContent, repDict);
  }

  renderComponent(regionName) {

    var latestRec = this.chartdata.latest[this.chartOptions.latestField];

    const repDict = {
      TOTAL:formatValue(latestRec.TOTAL,{format:'integer'}),
      CHANGE:formatValue(Math.abs(latestRec.CHANGE),{format:'integer'}),
      CHANGE_FACTOR:formatValue(Math.abs(latestRec.CHANGE_FACTOR),{format:'percent'}),
      REGION:regionName,
    };
    if (!('chartTitleState' in this.translationsObj)) {
      this.translationsObj.post_chartTitle = applySubstitutions(this.translationsObj.chartTitle, repDict) + " " + regionName;
    }
    else if (regionName == 'California') {
      this.translationsObj.post_chartTitle = applySubstitutions(this.translationsObj.chartTitleState, repDict);
    } else {
      this.translationsObj.post_chartTitle = applySubstitutions(this.translationsObj.chartTitleCounty, repDict);
    }
    // this.translationsObj.post_chartTitle = applySubstitutions(this.translationsObj.chartTitle, repDict);
    this.translationsObj.post_chartLegend1 = applySubstitutions(this.translationsObj.chartLegend1, repDict);
    this.translationsObj.post_chartLegend2 = applySubstitutions(latestRec.CHANGE_FACTOR >= 0? this.translationsObj.chartLegend2Increase : this.translationsObj.chartLegend2Decrease, repDict);
    this.translationsObj.currentLocation = regionName;

    this.innerHTML = template.call(this, this.chartOptions, this.translationsObj);

    let renderOptions = { 'tooltip_func':this.tooltip,
                      'extras_func':this.renderExtras,
                      'time_series_bars':this.chartdata.time_series[this.chartOptions.seriesField].VALUES,
                      'time_series_line':this.chartdata.time_series[this.chartOptions.seriesFieldAvg].VALUES,
                      'root_id':this.chartOptions.rootId,
                      'x_axis_legend':this.translationsObj.xAxisLegend,
                      'month_modulo':2,
                    };
    renderChart.call(this, renderOptions);
    
  }

  retrieveData(url, regionName) {
    if (regionName == 'Alpine') {
      let alldata = {
        "meta": {
          "PUBLISHED_DATE": getSnowflakeStyleDate(0),
          "coverage": regionName,
        },
        "data": {
          "latest": {
            "ICU_BEDS": {
              "TOTAL": 0,
              "CHANGE": 0,
              "CHANGE_FACTOR": 0,
              "POPULATION": 13354
            },
          },
          "time_series": {
            "ICU_BEDS": {
              "DATE_RANGE": {
                "MINIMUM": "2020-03-30",
                "MAXIMUM": getSnowflakeStyleDate(-1)
              },
             "VALUES": []
            },
          }
        }
      };

      let sdate = parseSnowflakeDate(alldata.data.time_series.ICU_BEDS.DATE_RANGE.MINIMUM);
      let today = new Date();
      while (+sdate < +today) {
        alldata.data.time_series.ICU_BEDS.VALUES.push({DATE:getSnowflakeStyleDateJS(sdate),VALUE:0});
        sdate.setDate(sdate.getDate() + 1);
      }

      this.metadata = alldata.meta;
      this.chartdata = alldata.data;
      this.regionName = regionName;
      this.renderComponent(regionName);
    } else {
      window
        .fetch(url)
        .then((response) => response.json() )
        .then(
          function (alldata) {
            this.metadata = alldata.meta;
            this.chartdata = alldata.data;
            this.renderComponent(regionName);
          }.bind(this)
        );
    }
    }

  listenForLocations() {
    let searchElement = document.querySelector("cagov-county-search");
    searchElement.addEventListener(
      "county-selected",
      function (e) {
        this.county = e.detail.county;
        let searchURL = config.chartsStateDashTablesLoc + this.chartOptions.dataUrlCounty.replace(
          "<county>",
          this.county.toLowerCase().replace(/ /g, "_")
        );
        this.retrieveData(searchURL, e.detail.county);
      }.bind(this),
      false
    );
  }
}

window.customElements.define(
  "cagov-chart-dashboard-icu-beds",
  CAGovDashboardICUBeds
);
