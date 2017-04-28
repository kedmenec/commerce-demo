import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import { Card, Icon, Image, Button, Rating } from 'semantic-ui-react'

class Products extends Component {


  addToCart = (product) => {
    this.props.dispatch({
      type: 'ADD_TO_CART_REQUEST',
      payload: product
    })
  }


  summarize_rating = (reviews) => {
    console.log('summarize_review')
    if (reviews.length === 0) {
       return 0
    }
    return 3
  }

  render () {
    const {
      products,
      category_filter,
      username
    } = this.props

    if (products.length === 0) {
      return null
    }

    // Filter the products by the search string if any is set.
    let searchString = '';
    try {
      const searchString = this.props.search.values.search ? this.props.search.values.search : '';
    } catch (e) {
      // pass
    }

    // if (!searchString) {
    //   searchString = ''
    // }
    console.log('props username' + username)
    let filtered_products = products.filter((product) => product.title.includes(searchString));
    // Filter the products by the selected category if set.
    if (category_filter) {
      filtered_products = filtered_products.filter((product) => product.category === category_filter);
    }

    return (
      <div style={{display: 'flex', flex: 1, flexFlow: 'row wrap', margin: 0, justifyContent: 'center', paddingTop: 20, paddingBottom: 20}}>
        { filtered_products.map((product, i) =>
          <Card style={{width: 250, margin: 20}} key={i}>
            {/*<Image src={product.image}/>*/}
            <Card.Content header={product.title} />
            <Card.Content description={'Colour: ' + product.colour} />
            <Card.Content description={'Category: ' + product.category} />
            <Card.Content description={'Price: ' + product.price} />
            <Card.Content>
              <Rating
                maxRating={5}
                defaultRating={this.summarize_rating(product.reviews)}
                icon='star'
                size='large'
                disabled={!Boolean(username)}
              />

            </Card.Content>
            <Card.Content extra>
              <Button basic color='blue' style={{width: '100%'}} onClick={this.addToCart.bind(this, product)}>Add to Cart</Button>
            </Card.Content>
          </Card>
        )}
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
const mapStateToProps = state => ({
  products: state.products.products,
  search: state.form.search,
  category_filter: state.navigation.filter,
  username: state.client.username
})

const connected = connect(mapStateToProps)(Products)

export default connected