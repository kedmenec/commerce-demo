import { call, put, takeEvery } from 'redux-saga/effects'
import { api } from '../utils/Api'
import { CLIENT_SET } from './constants'


function* getToken(action) {
  console.log('login')
  // Determine if we are logging in via token or traditional user/name password.
  // let auth_string = ''
  // const p = action.payload; // Shortcut for payload
  // if (p.token) {
  //   auth_string = p.token + ':'
  // }
  // else if (p.email && p.password) {
  //   auth_string = p.email + ':' + p.password
  // }

  const request = {
    endpoint: '/rest-auth/login/',
    method: 'POST',
    // headers: {
    //   'Authorization': 'Basic ' + btoa(auth_string)
    // },
    // payload: {
    //   username: 'tim',
    //   password: 'q1w2e3r4'
    // }
    payload: action.payload
  }
  try {
    const response = yield call(api, request);
    // On login sucess, do the following tasks in parallel
    yield [
      put({type: 'LOGIN_USER_SUCCESS', payload: {token: response.token}}),
      // put({type: 'USER_DETAIL_REQUEST'}),
      // put({type: 'GET_PROPERTIES_REQUEST'}),
      // put(push('/home/dashboard')),
      // put({type: 'SHOW_TOAST', payload: {message: 'Logged in'}})
    ]
    // toastr.success('Success', 'Logged in successfully!')
  } catch (e) {
    // Check to see if we used token or username and password to authenticate.
    // Only show toast when username/password used, not token.
    yield put({type: 'LOGIN_USER_FAILURE', payload: {message: e.data.message}})
    // if (p.email && p.password) {
    //   // yield put({type: 'SHOW_TOAST', payload: {message: 'Incorrect username or password'}})
    //   // toastr.error('Login Failed!', e.data.message)
    // }

  }
}


// function* getUserDetails() {
//   const request = {
//     endpoint: '/api/v1/account/',
//     method: 'GET',
//   }
//   try {
//     const response = yield call(api, request);
//     yield put({type: 'USER_DETAIL_SUCCESS', payload: response})
//   } catch (e) {
//     yield put({type: 'USER_DETAIL_FAILURE'});
//   }
// }


// function* registerUser(action) {
//   const request = {
//     endpoint: '/api/signup/',
//     method: 'POST',
//     payload: action.payload
//   }
//   try {
//     yield call(api, request);
//     yield put({type: 'REGISTER_USER_SUCCESS'})
//     yield put(push('/email_sent'))
//   } catch (e) {
//     // yield put(registerUserFailure(e.response.status, e.response.message));
//     yield put({type: "SHOW_TOAST", payload: {message: e.data.message}})
//   }
// }


// function* forgotPassword(action) {
//   const request = {
//     endpoint: '/api/forgot/',
//     method: 'POST',
//     payload: action.payload
//   }
//   try {
//     yield call(api, request);
//     // yield put(forgotPasswordSuccess(response.properties))
//     yield put({type: "SHOW_TOAST", payload: {message: "Email sent to forgot password"}})
//   } catch (e) {
//     // yield put(forgotPasswordFailure(e.status, e.data.message));
//     yield put({type: "SHOW_TOAST", payload: {message: e.data.message}})
//   }
// }


// function* resetPassword(action) {
//   const request = {
//     endpoint: '/api/v1/account/set',
//     method: 'POST',
//     payload: action.payload,
//     headers: {
//       'Authorization': 'Basic ' + btoa(action.payload.token + ':')
//     },
//   }
//   try {
//     yield call(api, request);
//     yield [
//       put({type: 'RESET_PASSWORD_SUCCESS'}),
//       put(push('/login')),
//     ]
//   } catch (e) {
//     yield put({type: "SHOW_TOAST", payload: {message: e.data.message}})
//   }
// }


export function* watchLoginRequest() {
  yield takeEvery('CLIENT_REQUEST', getToken);
}

// export function* watchUserDetailRequest() {
//   yield takeEvery("USER_DETAIL_REQUEST", getUserDetails);
// }

// export function* watchRegisterRequest() {
//   yield takeEvery("REGISTER_USER_REQUEST", registerUser);
// }

// export function* watchForgotPasswordRequest() {
//   yield takeEvery("FORGOT_PASSWORD_REQUEST", forgotPassword);
// }

// export function* watchResetPasswordRequest() {
//   yield takeEvery("RESET_PASSWORD_REQUEST", resetPassword);
// }

