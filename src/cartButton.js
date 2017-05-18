import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button } from "semantic-ui-react";
import { DropTarget } from "react-dnd";

import { connect } from "react-redux";

const cartTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    // console.dir(item);
    // Dispatch an action to add to cart.
    props.dispatch({ type: "ADD_TO_CART_REQUEST", payload: item });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class CartButton extends Component {
  render() {
    const { connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div>
        <Link to="/cart">
          <Button
            color={isOver ? "red" : "blue"}
            content={"Cart"}
            basic
            label={{
              basic: true,
              color: "blue",
              pointing: "left",
              icon: "cart"
            }}
          />
        </Link>
      </div>
    );
  }
}

// We only need to get the dispatch function which is default,
// we dont need any other props from the state.
const mapStateToProps = state => ({});

const droppable = DropTarget("product", cartTarget, collect)(CartButton);
const connected = connect(mapStateToProps)(droppable);
export default connected;
