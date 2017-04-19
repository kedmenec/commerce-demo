import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router'
import { connect}  from 'react-redux';
import Navigation from './navigation'
import { reduxForm, Field } from 'redux-form'

import {
  Link
} from 'react-router-dom'

// import {api} from '.utils/Api'
import { Button } from 'semantic-ui-react'
import { Card, Icon, Image, Input, Modal, Form } from 'semantic-ui-react'

class App extends Component {

  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  login = () => {
    this.props.dispatch({
      type: 'CLIENT_REQUEST',
      payload: {
        username: 'tim',
        password: 'q1w2e3r4'
      },
    })
    this.close()
  }

  componentDidMount = () => {
    // The first time the main component is mounted, dispatch a request to the api
    // to get all the products.
    this.props.dispatch({
      type: 'PRODUCT_LOAD_REQUEST'
    })
  }

  render() {
    const { open, dimmer } = this.state

    return (
      <div style={{display: 'flex',flexDirection: 'row', flex: 1, background: '#f7f7f7'}}>
        <div style={{flex:1}}/>

        <div style={{width:1200, display: 'flex', flexDirection: 'column', margin: 10}}>

          <Card fluid style={{display: 'flex', flexDirection: 'row', padding: 10, marginBottom: 0}}>
            <div style={{flex: 1, alignItems: 'center', display: 'flex'}}>
              <Link to='/products'>
                <Icon name='new pied piper' size='big' color='green' style={{marginBottom: 10}}/><b>CommercePiper</b>
              </Link>
            </div>
            <div style={{flex: 5, display: 'flex'}}>
              <Field
                name='search'
                component={Input}
                style={{flex: 1}}
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

            <div style={{flex: 1, justifyContent: 'flex-end', display: 'flex'}}>
              <Button basic color='blue' onClick={this.show('blurring')}>
                Login/Signup
              </Button>
            </div>
          </Card>
          <Card fluid style={{flex: 1}}>
            {this.props.children}
          </Card>

        </div>

        <div style={{flex:1, background: '#f7f7f7'}}/>


        <Modal dimmer={dimmer} open={open} onClose={this.close} size='small' closeIcon='close'>
          <Modal.Header>Login or Signup</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>If you already have a username and password, enter it here.</p>
              <p>If you dont, enter the username and password you want to use and we will create an account for you!</p>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Input placeholder='Username' style={{margin:5}}/>
                <Input placeholder='Password' style={{margin:5}}/>
              </div>
            </Modal.Description>

          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content="Login" onClick={this.login} />
          </Modal.Actions>
        </Modal>

      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // search: state.search
});

const connected = connect(mapStateToProps)(App)

const formed = reduxForm({
  form: 'search',
})(connected)

// Wrap with withRouter to get around shouldComponentUpdate on route change.
export default withRouter(formed);
