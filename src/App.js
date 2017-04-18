import React, { Component } from 'react';
import './App.css';


import {
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div style={{display: 'flex',flexDirection: 'row', flex: 1}}>
        <div style={{flex:1, background: '#f7f7f7'}}/>

        <div style={{width:1200, display: 'flex', flexDirection: 'column', background: '#f7f7f7', margin: 10}}>

          <div style={{background: 'gray', border: '1px solid black', display: 'flex', flexDirection: 'row', padding: 10}}>
            <div style={{flex: 1}}>PAG Commerce</div>
            <div style={{flex: 5, display: 'flex'}}>
              <input style={{flex: 1}}/>
            </div>
            <div style={{flex: 1}}>
              <Link to='/cart'>Cart</Link>
            </div>
          </div>

          <div style={{height: 10}}></div>
          <div style={{flex: 1, border: '1px solid black', background: 'white'}}>
            {this.props.children}
          </div>

        </div>

        <div style={{flex:1, background: '#f7f7f7'}}/>
      </div>

    );
  }
}

export default App;
