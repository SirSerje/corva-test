import React from 'react'
import logo from './logo.svg'
import './App.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from './redux/actions'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {count: 0}
  }
  
  render () {
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
            {this.props.reducer.counter}
          </p>
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
  console.log('___', state)
  return state
}

function mapDispatchToProps (dispatch) {
  console.log(actions)
  
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)