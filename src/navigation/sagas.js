import {put, takeEvery} from 'redux-saga/effects'

function * setCategory(action) {

  try {
    yield[put({type: 'SET_CATEGORY_SUCCESS', payload: action.payload})]
  } catch (e) {
    yield put({type: 'SET_CATEGORY_FAILURE', payload: action.payload})
  }
}

export function * watchSetCategoryFilterRequest() {
  yield takeEvery('SET_CATEGORY_REQUEST', setCategory);
}
