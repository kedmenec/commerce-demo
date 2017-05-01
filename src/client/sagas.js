import {call, put, takeEvery, select} from 'redux-saga/effects'
import {api} from '../utils/Api'

function * getToken(action) {
  const state = yield select();

  const tokenRequest = {
    endpoint: '/rest-auth/login/',
    method: 'POST',
    payload: {
      username: state.form.search.values.username,
      password: state.form.search.values.password
    }
  }

  const registerRequest = {
    endpoint: '/rest-auth/registration/',
    method: 'POST',
    payload: {
      username: state.form.search.values.username,
      password1: state.form.search.values.password,
      password2: state.form.search.values.password
    }
  }

  // Really simple but terrible user management, if the user cant login using the
  // username and password, try to create an account.
  try {
    yield call(api, registerRequest)
  } catch (e) {
    console.log('probably already registered')
  }

  try {
    const response = yield call(api, tokenRequest);
    yield[put({
        type: 'CLIENT_SET',
        payload: {
          token: response.key
        }
      }),
      put({type: 'USER_DETAIL_REQUEST'})]
  } catch (e) {
    yield put({
      type: 'LOGIN_USER_FAILURE',
      payload: {
        message: e.data.message
      }
    })
  }

}

function * getUserDetails(action) {
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
    yield[put({
        type: 'USER_DETAIL_SUCESS',
        payload: {
          username: response.username,
          id: response.pk
        }
      })]
  } catch (e) {
    yield put({
      type: 'USER_DETAIL_FAILURE',
      payload: {
        message: e.data.message
      }
    })
  }
}

export function * watchLoginRequest() {
  yield takeEvery('CLIENT_REQUEST', getToken);
}

export function * watchGetUserRequest() {
  yield takeEvery('USER_DETAIL_REQUEST', getUserDetails);
}