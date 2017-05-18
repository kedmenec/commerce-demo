import React, { Component } from "react";
import "./App.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Navigation from "./navigation";
import { reduxForm, Field } from "redux-form";

import { Link } from "react-router-dom";

import { Button } from "semantic-ui-react";
import { Card, Icon, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import CartButton from "./cartButton";

import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";

// A simple wrapper around the the semantic UI input component that will omit
// the meta prop (this avoids an "Unknown prop `meta` on <div>" error)
const renderInput = ({ input, meta, ...rest }) => (
  <Input {...input} {...rest} />
);

export class App extends Component {
  state = {
    login_open: false,
    logout_open: false
  };

  show_login = dimmer => () => this.setState({ dimmer, login_open: true });
  close_login = () => this.setState({ login_open: false });
  close_logout = () => this.setState({ logout_open: false });
  show_logout = dimmer => () => this.setState({ dimmer, logout_open: true });

  login = () => {
    this.props.dispatch({ type: "CLIENT_REQUEST" });
    this.close_login();
  };

  logout = () => {
    this.props.dispatch({ type: "CLIENT_UNSET" });
    this.close_logout();
  };

  componentDidMount = () => {
    // The first time the main component is mounted, dispatch a request to the api
    // to get all the products.
    this.props.dispatch({ type: "PRODUCT_LOAD_REQUEST" });
  };

  render() {
    const { login_open, logout_open, dimmer } = this.state;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          background: "#f7f7f7"
        }}
      >
        <div
          style={{
            flex: 1
          }}
        />

        <div
          style={{
            width: 1200,
            display: "flex",
            flexDirection: "column",
            margin: 10
          }}
        >

          <Card
            fluid
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 10,
              marginBottom: 0
            }}
          >
            <div
              style={{
                flex: 1,
                alignItems: "center",
                display: "flex"
              }}
            >
              <Link to="/">
                <Icon
                  name="new pied piper"
                  size="big"
                  color="green"
                  style={{
                    marginBottom: 10
                  }}
                />
                <b>CommercePiper</b>
              </Link>
            </div>
            <div
              style={{
                flex: 5,
                display: "flex"
              }}
            >
              <Field
                name="search"
                component={renderInput}
                style={{
                  flex: 1
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                display: "flex"
              }}
            >
              <CartButton />
            </div>
          </Card>

          <Card
            fluid
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 10,
              marginBottom: 0
            }}
          >

            <div
              style={{
                flex: 6,
                display: "flex"
              }}
            >
              {/*<Link to='/products'>Navigation</Link>*/}
              <Navigation />
            </div>

            <div
              style={{
                flex: 1,
                justifyContent: "flex-end",
                display: "flex"
              }}
            >
              {this.props.client.username
                ? <Button
                    basic
                    color="green"
                    onClick={this.show_logout("blurring")}
                  >
                    Hi {this.props.client.username}.. Logout?
                  </Button>
                : <Button
                    basic
                    color="blue"
                    onClick={this.show_login("blurring")}
                  >
                    Login/Signup
                  </Button>}

            </div>
          </Card>
          <Card
            fluid
            style={{
              flex: 1
            }}
          >
            {this.props.children}
          </Card>

        </div>

        <div
          style={{
            flex: 1,
            background: "#f7f7f7"
          }}
        />

        <LoginModal
          dimmer={dimmer}
          login_open={login_open}
          close_login={this.close_login}
          login={this.login}
        />
        <LogoutModal
          dimmer={dimmer}
          logout_open={logout_open}
          close_logout={this.close_logout}
          logout={this.logout}
        />
      </div>
    );
  }
}

App.propTypes = {
  client: PropTypes.any
};

const mapStateToProps = (state, ownProps) => ({ client: state.client });

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const draggable = DragDropContext(HTML5Backend)(App);

const connected = connect(mapStateToProps)(draggable);

const formed = reduxForm({ form: "search" })(connected);

// Wrap with withRouter to get around shouldComponentUpdate on route change.
// const dragdrop = DragDropContext(HTML5Backend)(formed);

export default withRouter(formed);
