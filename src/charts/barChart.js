import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';


const barChart = () => {
// Create chart instance
  var chart = am4core.create('chartdivBar', am4charts.XYChart);

// Add default data
  let range = [];
  for (let i = -100; i <= 100; i += 20) {
    range.push({'value': i, 'quantity': 0});
  }
  chart.data = range;

// Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = 'value';
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  
  categoryAxis.renderer.labels.template.adapter.add('dy',
    function (dy, target) {
      if (target.dataItem && target.dataItem.index & 2 == 2) {
        return dy + 25;
      }
      return dy;
    });
  
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = 'quantity';
  series.dataFields.categoryX = 'value';
  series.name = 'Visits';
  series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
  series.columns.template.fillOpacity = .8;
  
  var columnTemplate = series.columns.template;
  columnTemplate.strokeWidth = 2;
  columnTemplate.strokeOpacity = 1;
  
  return chart;
};

export default barChart;