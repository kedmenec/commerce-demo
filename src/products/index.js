import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import { Card, Icon, Image, Button } from 'semantic-ui-react'

class Products extends Component {
  render () {
    const {
      products,
    } = this.props

    if (products.length === 0) {
      return null
    }


    // The products should pass through the visability filter first.

    return (
      <div style={{display: 'flex', flex: 1, flexFlow: 'row wrap', margin: 0, justifyContent: 'center', paddingTop: 20, paddingBottom: 20}}>
        { products.map((product, i) =>
          <Card style={{width: 250, margin: 20}} key={i}>
            <Image src={product.image}/>
            <Card.Content header={product.title} />
            <Card.Content description={'Colour: ' + product.colour} />
            <Card.Content description={'Category: ' + product.category} />
            <Card.Content description={'Price: ' + product.price} />
            <Card.Content extra>
              <Button basic color='blue' style={{width: '100%'}}>Add to Cart</Button>
            </Card.Content>
          </Card>
        )}
      </div>
    )
  }
}

// Pass the correct proptypes in for validation
Products.propTypes = {
    products: PropTypes.array
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  products: state.products.products,
})

const connected = connect(mapStateToProps)(Products)

export default connected