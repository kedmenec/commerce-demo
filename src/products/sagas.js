import {call, put, takeEvery, select} from 'redux-saga/effects'
import {api} from '../utils/Api'
import {PRODUCT_LOAD_SUCCESS} from './constants'

function * getProducts(action) {
  const request = {
    endpoint: '/products',
    method: 'GET'
  }
  try {
    const response = yield call(api, request);
    yield[put({type: PRODUCT_LOAD_SUCCESS, payload: response.results})]
  } catch (e) {
    console.log('error loading products')
  }
}

function * review(action) {

  const state = yield select();
  const request = {
    endpoint: '/reviews/',
    method: 'POST',
    payload: action.payload,
    headers: {
      'Authorization': 'Token ' + state.client.token
    }
  }

  try {
    yield call(api, request);
    yield[put({type: 'REVIEW_SUCCESS'}),
      put({type: 'PRODUCT_LOAD_REQUEST'})]
  } catch (e) {
    console.log('error loading products')
  }
}

export function * watchProductLoadRequest() {
  yield takeEvery('PRODUCT_LOAD_REQUEST', getProducts);
}

export function * watchReviewRequest() {
  yield takeEvery('REVIEW_REQUEST', review);
}
