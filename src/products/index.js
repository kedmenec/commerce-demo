import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types';

class Products extends Component {
  render () {
    // Shortcut the props
    const {
      products,
    } = this.props

    if (products.length === 0) {
      return null
    }
    return (
      <ul>
        { products.map((product, i) => <li key={i}>{product.title}, {product.category}</li>) }
      </ul>
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