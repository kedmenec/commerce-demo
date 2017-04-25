import { call, put, takeEvery } from 'redux-saga/effects'
import { api } from '../utils/Api'
// import { PRODUCT_LOAD_SUCCESS } from './constants'

function* addToCart(action) {
  try {
    yield [
      put({type: 'ADD_TO_CART_SUCCESS', payload: action.payload}),
    ]
  } catch (e) {
    console.log('error')
  }
}

function* removeFromCart(action) {
  try {
    yield [
      put({type: 'REMOVE_FROM_CART_SUCCESS', payload: action.payload}),
    ]
  } catch (e) {
    console.log('error')
  }
}


export function* watchAddToCartRequest() {
  yield takeEvery('ADD_TO_CART_REQUEST', addToCart);

}

export function* watchRemoveFromCartRequest() {
  yield takeEvery('REMOVE_FROM_CART_REQUEST', removeFromCart);
}
