import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './redux/actions';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import chart from './charts/lineChart';
import barChart from './charts/barChart';
import { MAX_VALUE, MIN_VALUE, STEP } from './charts/config';


class App extends React.Component {
  
  componentDidMount () {
    am4core.useTheme(am4themes_animated);
    this.chart = chart();
    this.barChart = barChart();
  }
  
  shouldComponentUpdate (props) {
    //line chart
    const lineChartData = props.items.map((i, idx) => {
      return {
        date: new Date(i.timestamp),
        name: 'name' + idx,
        value: i.value,
      };
    });
    
    //bar chart
    let barChartData = [];
    for (let range = MIN_VALUE; range < MAX_VALUE; range += STEP) {
      let current = 0;
      props.items.map(i => (i.value >= range && i.value < (range + STEP))
        ? current++
        : current);
      barChartData.push(
        {'value': `${range} - ${range + STEP}`, 'quantity': current});
    }
    
    if (this.barChart.data.length !== barChartData.length ||
      this.chart.data.length !== lineChartData.length) {
      
      this.barChart.data = barChartData;
      this.chart.data = lineChartData;
      
      return true;
    } else return false;
  }
  
  componentWillUnmount () {
    this.chart && this.chart.dispose();
    this.barChart && this.barChart.dispose();
  }
  
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <div id="chartdiv" style={{width: '50%', height: '500px'}}/>
          <div id="chartdivBar" style={{width: '50%', height: '500px'}}/>
        </header>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);