import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import products from './products/reducer'
import cart from './cart/reducer'
import navigation from './navigation/reducer'
// import signup from './signup/reducer'
// import login from './login/reducer'
// import widgets from './widgets/reducer'

const IndexReducer = combineReducers({
  // signup,
  client,
  products,
  form,
  cart,
  navigation,
  // widgets,
})

export default IndexReducer