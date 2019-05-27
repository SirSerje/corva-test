import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';


const chart = () => {
  
  let chart = am4core.create('chartdiv', am4charts.XYChart);
  
  chart.paddingRight = 20;
  
  let data = [];
  
  chart.data = data;
  
  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  // dateAxis.renderer.grid.template.location = 0;
  
  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = -100;
  valueAxis.max = 100;
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.minWidth = 35;
  
  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.dateX = 'date';
  series.dataFields.valueY = 'value';
  
  series.tooltipText = '{value}';
// series.tooltipText = '{valueY.value}'
  chart.cursor = new am4charts.XYCursor();
  
  let bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.strokeWidth = 2;
  bullet.circle.radius = 4;
  bullet.circle.fill = am4core.color('#fff');
  
  let scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(series);
  chart.scrollbarX = scrollbarX;
  
  chart.seriesContainer.resizable = false;
  
  return chart;
};

export default chart;