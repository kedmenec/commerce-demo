import { call, put, takeEvery, select } from 'redux-saga/effects'
import { api } from '../utils/Api'
import { CLIENT_SET } from './constants'


function* getToken(action) {
  const state = yield select();

  let payload = {
    username: state.form.search.values.username,
    password: state.form.search.values.password,
  }
  console.log('logging in')
  console.log(payload)
  const request = {
    endpoint: '/rest-auth/login/',
    method: 'POST',
    payload: payload
  }

  try {
    const response = yield call(api, request);
    // console.log('Responseee')
    // console.dir(response)
    yield [
      put({type: 'CLIENT_SET', payload: {token: response.key}}),
      put({type: 'USER_DETAIL_REQUEST'})
    ]
  } catch (e) {
    yield put({type: 'LOGIN_USER_FAILURE', payload: {message: e.data.message}})
  }

}


function* getUserDetails(action) {
  const state = yield select();
  const request = {
    endpoint: '/rest-auth/user/',
    method: 'GET',
    headers: {
      'Authorization': 'Token ' + state.client.token
    }
  }


  try {
    const response = yield call(api, request);
    console.log("Get yser deets")
    console.dir(response)
    yield [
      put({type: 'USER_DETAIL_SUCESS', payload: {username: response.username, id: response.pk}}),
    ]
  } catch (e) {
    yield put({type: 'USER_DETAIL_FAILURE', payload: {message: e.data.message}})
  }



}


export function* watchLoginRequest() {
  yield takeEvery('CLIENT_REQUEST', getToken);
}

export function* watchGetUserRequest() {
  yield takeEvery('USER_DETAIL_REQUEST', getUserDetails);
}