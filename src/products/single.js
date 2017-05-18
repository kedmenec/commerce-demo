import React, { Component } from "react";
import { DragSource } from "react-dnd";
import { Card, Button, Rating } from "semantic-ui-react";
import { connect } from "react-redux";

const productSource = {
  beginDrag(props) {
    // What you return is the only information available to the drop targets
    // about the drag source so it's important to pick the minimal data they need to know.
    return props.product;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class SingleProduct extends Component {
  summarize_rating = product => {
    if (product.reviews.length === 0) {
      return 0;
    }
    // calculate the average rating
    let average_rating =
      product.reviews.reduce((a, b) => a + b.rating, 0) /
      product.reviews.length;
    return average_rating;
  };

  rate = product => {
    this.setState({ rating_dialog_open: true, rating_dialog_product: product });
  };

  addToCart = product => {
    this.props.dispatch({ type: "ADD_TO_CART_REQUEST", payload: product });
  };

  render() {
    const {
      product,

      connectDragSource,
      isDragging
    } = this.props;

    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          background: isDragging ? "red" : null,
          cursor: "move"
        }}
      >
        <Card
          style={{
            width: 250,
            margin: 20
          }}
          key={product.id}
        >
          {/*<Image src={product.image}/>*/}
          <Card.Content header={product.title} />
          <Card.Content description={"Colour: " + product.colour} />
          <Card.Content description={"Category: " + product.category} />
          <Card.Content description={"Price: " + product.price} />
          <Card.Content>
            <Rating
              maxRating={5}
              defaultRating={this.summarize_rating(product)}
              icon="star"
              size="large"
              disabled
              onClick={this.rate.bind(this, product)}
            />
            {" "}
            {"(" + product.reviews.length + ")"}
          </Card.Content>
          <Card.Content extra>
            <Button
              basic
              color="blue"
              style={{
                width: "100%"
              }}
              onClick={this.addToCart.bind(this, product)}
            >
              Add to Cart
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

// We only need to get the dispatch function which is default,
// we dont need any other props from the state.
const mapStateToProps = state => ({});

const draggable = DragSource("product", productSource, collect)(SingleProduct);
const connected = connect(mapStateToProps)(draggable);
export default connected;
