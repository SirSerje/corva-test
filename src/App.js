import React from 'react'
import logo from './logo.svg'
import './App.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from './redux/actions'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

class App extends React.Component {
  /* constructor (props) {
     super(props)
   }*/
  
  componentDidMount () {
    let chart = am4core.create('chartdiv', am4charts.XYChart)
    
    chart.paddingRight = 20
    
    let data = []
    
    chart.data = data
    
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minWidth = 35
    
    let series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'value'
    
    series.tooltipText = '{valueY.value}'
    chart.cursor = new am4charts.XYCursor()
    
    let bullet = series.bullets.push(new am4charts.CircleBullet())
    bullet.circle.strokeWidth = 2
    bullet.circle.radius = 4
    bullet.circle.fill = am4core.color('#fff')
    
    let scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(series)
    chart.scrollbarX = scrollbarX
    
    this.chart = chart
  }
  
  componentDidUpdate (oldProps) {
    console.warn(oldProps.items)
    this.chart.data = oldProps.items.map((i, idx) => {
      return {
        date: new Date(i.timestamp),
        name: 'name' + idx,
        value: i.value,
      }
    })
  }
  
  componentWillUnmount () {
    if (this.chart) {
      this.chart.dispose()
    }
  }
  
  render () {
    
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <div id="chartdiv" style={{width: '100%', height: '500px'}}/>
          
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {this.props.items.map((i, idx) => <i key={idx}>{i.value}</i>)}
          <button onClick={() => this.props.actions.decrease()}>-</button>
          <button onClick={() => this.props.actions.increase()}>+</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        
        </header>
      </div>
    )
  }
  
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)