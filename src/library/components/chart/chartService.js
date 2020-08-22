export function installShowAllTooltipsPlugin(Chart) {
  Chart.plugins.register({
    beforeRender(chart) {
      if (chart.config.options.showAllTooltips) {
        chart.pluginTooltips = [];
        chart.config.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach(sector => {
            chart.pluginTooltips.push(new Chart.Tooltip({
              _chart: chart.chart,
              _chartInstance: chart,
              _data: chart.data,
              _options: chart.options.tooltips,
              _active: [sector],
            }, chart));
          });
        });

        chart.options.tooltips.enabled = false;
      }
    },
    afterDraw(chart, easing) {
      if (chart.config.options.showAllTooltips) {
        if (!chart.allTooltipsOnce) {
          if (easing !== 1) return;
          chart.allTooltipsOnce = true;
        }

        chart.options.tooltips.enabled = true;
        Chart.helpers.each(chart.pluginTooltips, tooltip => {
          if (!tooltip._active[0].hidden) {
            tooltip.initialize();
            tooltip.update();
            tooltip.pivot();
            tooltip.transition(easing).draw();
          }
        });
        chart.options.tooltips.enabled = false;
      }
    },
  });
}
