import React, {Component} from 'react';
import './App.css';
import {withRouter} from 'react-router'
import {connect} from 'react-redux';
import Navigation from './navigation'
import {reduxForm, Field} from 'redux-form'

import {Link} from 'react-router-dom'

import {Button} from 'semantic-ui-react'
import {Card, Icon, Input, Modal} from 'semantic-ui-react'

// A simple wrapper around the the semantic UI input component that will omit
// the meta prop (this avoids an "Unknown prop `meta` on <div>" error)
const renderInput = ({
  input,
  meta,
  ...rest
}) => <Input {...input} {...rest}/>

export class App extends Component {

  state = {
    login_open: false,
    logout_open: false
  }

  show_login = (dimmer) => () => this.setState({dimmer, login_open: true})
  close_login = () => this.setState({login_open: false})
  close_logout = () => this.setState({logout_open: false})
  show_logout = (dimmer) => () => this.setState({dimmer, logout_open: true})

  login = () => {
    this
      .props
      .dispatch({type: 'CLIENT_REQUEST'})
    this.close_login()
  }

  logout = () => {
    this
      .props
      .dispatch({type: 'CLIENT_UNSET'})
    this.close_logout()
  }

  componentDidMount = () => {
    // The first time the main component is mounted, dispatch a request to the api
    // to get all the products.
    this
      .props
      .dispatch({type: 'PRODUCT_LOAD_REQUEST'})
  }

  render() {

    const {login_open, logout_open, dimmer} = this.state

    return (
      <div
        style={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        background: '#f7f7f7'
      }}>
        <div style={{
          flex: 1
        }}/>

        <div
          style={{
          width: 1200,
          display: 'flex',
          flexDirection: 'column',
          margin: 10
        }}>

          <Card
            fluid
            style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            marginBottom: 0
          }}>
            <div
              style={{
              flex: 1,
              alignItems: 'center',
              display: 'flex'
            }}>
              <Link to='/'>
                <Icon
                  name='new pied piper'
                  size='big'
                  color='green'
                  style={{
                  marginBottom: 10
                }}/>
                <b>CommercePiper</b>
              </Link>
            </div>
            <div
              style={{
              flex: 5,
              display: 'flex'
            }}>
              <Field
                name='search'
                component={renderInput}
                style={{
                flex: 1
              }}/>
            </div>
            <div
              style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              display: 'flex'
            }}>
              <Link to='/cart'>
                <Button
                  color='blue'
                  content={'Cart'}
                  basic
                  label={{
                  basic: true,
                  color: 'blue',
                  pointing: 'left',
                  icon: 'cart'
                }}/>
              </Link>
            </div>
          </Card>

          <Card
            fluid
            style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            marginBottom: 0
          }}>

            <div
              style={{
              flex: 6,
              display: 'flex'
            }}>
              {/*<Link to='/products'>Navigation</Link>*/}
              <Navigation/>
            </div>

            <div
              style={{
              flex: 1,
              justifyContent: 'flex-end',
              display: 'flex'
            }}>
              {this.props.client.username
                ? <Button basic color='green' onClick={this.show_logout('blurring')}>Hi {this.props.client.username}.. Logout?</Button>
                : <Button basic color='blue' onClick={this.show_login('blurring')}>
                  Login/Signup
                </Button>
}

            </div>
          </Card>
          <Card fluid style={{
            flex: 1
          }}>
            {this.props.children}
          </Card>

        </div>

        <div style={{
          flex: 1,
          background: '#f7f7f7'
        }}/>

        <Modal
          dimmer={dimmer}
          open={login_open}
          onClose={this.close_login}
          size='small'
          closeIcon='close'>
          <Modal.Header>Login or Signup</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>If you already have a username and password, enter it here.</p>
              <p>If you dont, enter the username and password you want to use and we will
                create an account for you!</p>
              <div
                style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Field
                  name='username'
                  component={renderInput}
                  placeholder='Username'
                  style={{
                  margin: 5
                }}/>

                <Field
                  name='password'
                  component={renderInput}
                  placeholder='Password'
                  style={{
                  margin: 5
                }}/>
              </div>
            </Modal.Description>

          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Login"
              onClick={this.login}/>
          </Modal.Actions>
        </Modal>

        <Modal
          dimmer={dimmer}
          open={logout_open}
          onClose={this.close_logout}
          size='small'
          closeIcon='close'>
          <Modal.Header>Logout</Modal.Header>

          <Modal.Actions>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Logout"
              onClick={this.logout}/>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({client: state.client});

const connected = connect(mapStateToProps)(App)

const formed = reduxForm({form: 'search'})(connected)

// Wrap with withRouter to get around shouldComponentUpdate on route change.
export default withRouter(formed);
