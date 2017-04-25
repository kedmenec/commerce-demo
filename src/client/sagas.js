import { call, put, takeEvery } from 'redux-saga/effects'
import { api } from '../utils/Api'
import { CLIENT_SET } from './constants'


function* getToken(action) {
  const request = {
    endpoint: '/rest-auth/login/',
    method: 'POST',
    payload: action.payload
  }

  try {
    const response = yield call(api, request);
    yield [
      put({type: 'LOGIN_USER_SUCCESS', payload: {token: response.token}}),
    ]
  } catch (e) {
    yield put({type: 'LOGIN_USER_FAILURE', payload: {message: e.data.message}})
  }
}

export function* watchLoginRequest() {
  yield takeEvery('CLIENT_REQUEST', getToken);
}
