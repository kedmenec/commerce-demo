import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import { Card, Icon, Image, Menu} from 'semantic-ui-react'

class Navigation extends Component {

  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const {
      products,
    } = this.props

    if (products.length === 0) {
      return null
    }
    const { activeItem } = this.state
    const catSet = new Set(products.map(function(d) { return d['category']; }))

    // The products should pass through the visability filter first.
    return (
      <div style={{display: 'flex', flex: 1}}>
        <Menu style={{flex: 1}}>
          {[...catSet].sort().map((category, i) =>
            <Menu.Item
              name={category}
              active={activeItem === category}
              onClick={this.handleItemClick}
              key={i}
              >{category}
            </Menu.Item>
          )}
          </Menu>
      </div>
    )
  }
}

// Pass the correct proptypes in for validation
Navigation.propTypes = {
    products: PropTypes.array
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  products: state.products.products,
})

const connected = connect(mapStateToProps)(Navigation)

export default connected