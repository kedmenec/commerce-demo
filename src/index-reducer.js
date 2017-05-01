import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import client from './client/reducer'
import products from './products/reducer'
import cart from './cart/reducer'
import navigation from './navigation/reducer'

const IndexReducer = combineReducers({
  client,
  products,
  form,
  cart,
  navigation,
})

export default IndexReducer