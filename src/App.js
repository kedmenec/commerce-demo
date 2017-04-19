import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router'
import { connect}  from 'react-redux';
import Navigation from './navigation'

import {
  Link
} from 'react-router-dom'

// import {api} from '.utils/Api'
import { Button } from 'semantic-ui-react'


import { Card, Icon, Image, Input } from 'semantic-ui-react'

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
    console.log('rendering')
    return (
      <div style={{display: 'flex',flexDirection: 'row', flex: 1, background: '#f7f7f7'}}>
        <div style={{flex:1, }}/>

        <div style={{width:1200, display: 'flex', flexDirection: 'column', margin: 10}}>

          <Card fluid style={{display: 'flex', flexDirection: 'row', padding: 10, marginBottom: 0}}>
            <div style={{flex: 1, alignItems: 'center', display: 'flex'}}>
              <Icon name='new pied piper' size='big' color='green' style={{marginBottom: 10}}/><b>CommercePiper</b>
            </div>
            <div style={{flex: 5, display: 'flex'}}>
              <Input
                style={{flex: 1}}
                placeholder='Search...'
              />
            </div>
            <div style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', display: 'flex'}}>
              <Link to='/cart'>
                <Button
                  color='blue'
                  content='Cart'
                  basic
                  label={{basic: true, color: 'blue', pointing: 'left', icon: 'cart'}}
                />
              </Link>
            </div>
          </Card>

          <Card fluid style={{display: 'flex', flexDirection: 'row', padding: 10, marginBottom: 0}}>

            <div style={{flex: 6, display: 'flex'}}>
              {/*<Link to='/products'>Navigation</Link>*/}
              <Navigation/>
            </div>

            <div style={{flex: 1}}>
              <div onClick={this.load_products}>
                Login/Signup (or my account)
              </div>
            </div>
          </Card>
          <Card fluid style={{flex: 1}}>
            {this.props.children}
          </Card>

        </div>

        <div style={{flex:1, background: '#f7f7f7'}}/>
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => ({

});

const connected = connect(mapStateToProps)(App)

// Wrap with withRouter to get around shouldComponentUpdate on route change.
export default withRouter(connected);
