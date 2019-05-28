import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './redux/actions';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import chart from './lineChart';
import barChart from './barChart';


am4core.useTheme(am4themes_animated);

//FIXME: receive props early

class App extends React.Component {
  
  componentDidMount () {
    this.chart = chart();
    this.barChart = barChart();
  }
  
  componentDidUpdate (oldProps) {
    //simple chart
    this.chart.data = oldProps.items.map((i, idx) => {
      return {
        date: new Date(i.timestamp),
        name: 'name' + idx,
        value: i.value,
      };
    });
    
    //bar chart
    let barChartData = [];
    for (let range = -100; range < 100; range += 20) {
      let current = 0;
      oldProps.items.map(i => (i.value >= range && i.value < (range + 20))
        ? current++
        : current);
      barChartData.push(
        {'value': `${range} - ${range + 20}`, 'quantity': current});
    }
    
    this.barChart.data = barChartData;
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