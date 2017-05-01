import {put, takeEvery} from 'redux-saga/effects'

function * addToCart(action) {
  try {
    yield[put({type: 'ADD_TO_CART_SUCCESS', payload: action.payload})]
  } catch (e) {
    console.log('error')
  }
}

function * removeFromCart(action) {
  try {
    yield[put({type: 'REMOVE_FROM_CART_SUCCESS', payload: action.payload})]
  } catch (e) {
    console.log('error')
  }
}

function * checkout(action) {
  try {
    yield[// Put a notification side affect in here.
      put({type: 'CHECKOUT_SUCCESS'})]
  } catch (e) {
    console.log('error')
  }
}

export function * watchAddToCartRequest() {
  yield takeEvery('ADD_TO_CART_REQUEST', addToCart);
}

export function * watchRemoveFromCartRequest() {
  yield takeEvery('REMOVE_FROM_CART_REQUEST', removeFromCart);
}

export function * watchCheckoutRequest() {
  yield takeEvery('CHECKOUT_REQUEST', checkout);
}
