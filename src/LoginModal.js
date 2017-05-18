import React, { Component } from "react";
import { Input, Modal } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Field } from "redux-form";

// A simple wrapper around the the semantic UI input component that will omit
// the meta prop (this avoids an "Unknown prop `meta` on <div>" error)
const renderInput = ({ input, meta, ...rest }) => (
  <Input {...input} {...rest} />
);

export default class LoginModal extends Component {
  render() {
    return (
      <Modal
        dimmer={this.props.dimmer}
        open={this.props.login_open}
        onClose={this.props.close_login}
        size="small"
        closeIcon="close"
      >
        <Modal.Header>Login or Signup</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>If you already have a username and password, enter it here.</p>
            <p>
              If you dont, enter the username and password you want to use and we will
              create an account for you!
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Field
                name="username"
                component={renderInput}
                placeholder="Username"
                style={{
                  margin: 5
                }}
              />

              <Field
                name="password"
                component={renderInput}
                placeholder="Password"
                style={{
                  margin: 5
                }}
              />
            </div>
          </Modal.Description>

        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Login"
            onClick={this.props.login}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
