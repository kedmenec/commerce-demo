import React, { Component } from 'react';
import './App.css';

import { connect}  from 'react-redux';

import {
  Link
} from 'react-router-dom'

// import {api} from '.utils/Api'




class App extends Component {

  login = () => {
    this.props.dispatch({
      type: 'CLIENT_REQUEST',
      payload: {
        username: 'tim',
        password: 'q1w2e3r4'
      },
      // property_id: this.props.propertyId,
      // maintenance_id: this.props.record.id
    })
  }

  load_products = () => {
    console.log('load products')
    this.props.dispatch({
      type: 'PRODUCT_LOAD_REQUEST'
    })
  }


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

          <div style={{background: 'orange', border: '1px solid black', display: 'flex', flexDirection: 'row', padding: 10}}>
            <div style={{flex: 6, display: 'flex'}}>
              Navigation
            </div>
            <div style={{flex: 1}}>
              <div onClick={this.load_products}>
                Login/Signup (or my account)
              </div>
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


const mapStateToProps = (state, ownProps) => ({

});

// MaintenanceRecordFull = withRouter(connect(mapStateToProps)(MaintenanceRecordFull));

// export default MaintenanceRecordFull

export default connect(mapStateToProps)(App);
