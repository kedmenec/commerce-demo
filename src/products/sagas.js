import { call, put, takeEvery } from 'redux-saga/effects'
import { api } from '../utils/Api'
import { PRODUCT_LOAD_SUCCESS } from './constants'

function* getProducts(action) {
  const request = {
    endpoint: '/products',
    method: 'GET',
  }
  try {
    const response = yield call(api, request);
    yield [
      put({type: PRODUCT_LOAD_SUCCESS, payload: response.results}),
    ]
  } catch (e) {
    console.log('error loading products')
  }
}

export function* watchProductLoadRequest() {
  yield takeEvery('PRODUCT_LOAD_REQUEST', getProducts);
}
