import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";

export default class LogoutModal extends Component {
  render() {
    return (
      <Modal
        dimmer={this.props.dimmer}
        open={this.props.logout_open}
        onClose={this.props.close_logout}
        size="small"
        closeIcon="close"
      >
        <Modal.Header>Logout</Modal.Header>

        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Logout"
            onClick={this.props.logout}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
