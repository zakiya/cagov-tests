import css from "./histogram.scss";
/**
 * Generic template for mixed line/bar charts on State Dashboard
 * 
 */
export default function template(chartOptions, {
  post_chartTitle = "chart title",
  post_chartLegend1 = "Chart Legend 1", // expected
  post_chartLegend2 = "Chart Legend 2", // expected
  post_chartLegend3 = null, // only used if provided
  filterTabLabel1 = 'Tab Label 1',
  filterTabLabel2 = 'Tab Label 2',
}) {
  let tabMarkup = '';
  if ('filterKeys' in chartOptions) {
    let active1 = this.chartConfigFilter == chartOptions.filterKeys[0]? "active" : "";
    let active2 = this.chartConfigFilter == chartOptions.filterKeys[1]? "active" : "";
    tabMarkup = `<cagov-chart-filter-buttons class="filter-buttons--statedash js-re-smalls js-filter-${this.chartConfigKey}">
            <div class="d-flex justify-content-center">
              <button class="small-tab ${active1}" data-key="${chartOptions.filterKeys[0]}">${filterTabLabel1}</button>
              <button class="small-tab ${active2}" data-key="${chartOptions.filterKeys[1]}">${filterTabLabel2}</button>
            </div>
          </cagov-chart-filter-buttons>`;
  }

  return /*html*/ `
    <div class="py-2">
      <div class="bg-white pt-2 pb-1">
        <div class="mx-auto chart-histogram">
            <div class="chart-title">${post_chartTitle}</div>
            ${tabMarkup}
            <div class="chart-header">
            <div class="header-line header-line1">${post_chartLegend1}</div>
            <div class="header-line">${post_chartLegend2}</div>
` +
(post_chartLegend3?
`            <div class="header-line">${post_chartLegend3}</div>
` : '') +
`            </div>
            <div class="svg-holder"></div>
            <!-- <a class="dl-button" role="button">download</a> -->
        </div>
      </div>
    </div>
    `;
}
