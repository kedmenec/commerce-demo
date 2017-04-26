import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import { Card, Icon, Image, Menu} from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'

// export the unwrapped component by itself as well for testing.
// Testing HOC add significant overhead that for now doesnt add value.
export class Navigation extends Component {

  state = {}

  handleItemClick = (e, { name }) => {
    // We should disapatch the active filter here to save in state.

    this.props.dispatch({
      type: 'SET_CATEGORY_REQUEST',
      payload: name
    })

  }

  render () {
    const {
      products,
    } = this.props

    if (products.length === 0) {
      return null
    }
    const activeItem = this.props.filter
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
  filter: state.navigation.filter
})


const connected = connect(mapStateToProps)(Navigation)

const formed = reduxForm({
  form: 'navigation',
})(connected)

export default connected