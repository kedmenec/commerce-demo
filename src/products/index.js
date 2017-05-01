import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {
  Card,
  Icon,
  Button,
  Rating,
  Modal,
  Input,
  Message
} from 'semantic-ui-react'

class Products extends Component {

  state = {
    rating_dialog_open: false,
    rating_dialog_product: null
  }

  handleClose = (e) => this.setState({rating_dialog_open: false})

  addToCart = (product) => {
    this
      .props
      .dispatch({type: 'ADD_TO_CART_REQUEST', payload: product})
  }

  rate = (product) => {
    this.setState({rating_dialog_open: true, rating_dialog_product: product})
  }

  summarize_rating = (product) => {
    if (product.reviews.length === 0) {
      return 0
    }
    // calculate the average rating
    let average_rating = product
      .reviews
      .reduce((a, b) => a + b.rating, 0) / product.reviews.length
    return average_rating
  }

  handleRate = (event, data) => {
    this.setState({rating: data.rating})
  }

  handleReview = (event, data) => {
    this.setState({review: data.value})
  }

  handleRateClick = (event, data) => {
    const review = {
      rating: this.state.rating,
      text: this.state.review,
      product: this.state.rating_dialog_product.id
    }

    this
      .props
      .dispatch({type: 'REVIEW_REQUEST', payload: review})
    this.handleClose()
  }

  render() {
    const {products, category_filter, username, search} = this.props

    if (!products) {
      return null
    }

    if (products.length === 0) {
      return null
    }

    // Filter the products by the search string if any is set.
    let searchString = '';
    try {
      searchString = search.values.search
        ? search.values.search
        : '';
    } catch (e) {
      // pass
    }

    let filtered_products = products.filter((product) => product.title.includes(searchString));
    // Filter the products by the selected category if set.
    if (category_filter) {
      filtered_products = filtered_products.filter((product) => product.category === category_filter);
    }

    if (filtered_products.length === 0) {
      return (
        <div
          style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h3>There a no products matching the active filters</h3>
        </div>
      )
    }

    return (
      <div
        style={{
        display: 'flex',
        flexFlow: 'row wrap',
        margin: 0,
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20
      }}>
        {filtered_products.map((product) => <Card
          style={{
          width: 250,
          margin: 20
        }}
          key={product.id}>
          {/*<Image src={product.image}/>*/}
          <Card.Content header={product.title}/>
          <Card.Content description={'Colour: ' + product.colour}/>
          <Card.Content description={'Category: ' + product.category}/>
          <Card.Content description={'Price: ' + product.price}/>
          <Card.Content>
            <Rating
              maxRating={5}
              defaultRating={this.summarize_rating(product)}
              icon='star'
              size='large'
              disabled
              onClick={this
              .rate
              .bind(this, product)}/> {'(' + product.reviews.length + ')'}
          </Card.Content>
          <Card.Content extra>
            <Button
              basic
              color='blue'
              style={{
              width: '100%'
            }}
              onClick={this
              .addToCart
              .bind(this, product)}>Add to Cart</Button>
          </Card.Content>
        </Card>)}

        {this.state.rating_dialog_product && <Modal open={this.state.rating_dialog_open} onClose={this.handleClose}>
          <Modal.Content>
            <h3>Reviews for
              <b>{this.state.rating_dialog_product.title}</b>
            </h3>
          </Modal.Content>

          {this.state.rating_dialog_product.reviews.length === 0 && <Modal.Content>There are no reviews</Modal.Content>
}

          {this
            .state
            .rating_dialog_product
            .reviews
            .map((review) => (
              <Modal.Content>
                <div>User: {review.user}</div>
                <div>Review: {review.text}</div>
                <div>Rating: {review.rating}</div>
              </Modal.Content>
            ))}

          {this.props.username
            ? <Modal.Content>
                <Message>
                  <h3>Leave Review</h3>
                  <Input
                    style={{
                    padding: 10,
                    width: '100%'
                  }}
                    onChange={this.handleReview}/>
                  <br/>
                  <Rating
                    maxRating={5}
                    defaultRating={0}
                    icon='star'
                    size='large'
                    onClick={this
                    .rate
                    .bind(this, this.state.rating_dialog_product)}
                    onRate={this.handleRate}/>
                  <br/>
                  <Button color='green' inverted onClick={this.handleRateClick}>
                    <Icon name='checkmark'/>
                    Submit Review
                  </Button>
                </Message>
              </Modal.Content>
            : <Modal.Content>
              <Message>
                You must be logged in to leave a review.
              </Message>
            </Modal.Content>
}

        </Modal>
}
      </div>
    )
  }
}

// Pass the correct proptypes in for validation
Products.propTypes = {
  products: PropTypes.array,
  category_filter: PropTypes.any
}

// Grab only the piece of state we need
const mapStateToProps = state => ({products: state.products.products, search: state.form.search, category_filter: state.navigation.filter, username: state.client.username})

const connected = connect(mapStateToProps)(Products)

export default connected