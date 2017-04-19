import {watchLoginRequest} from './client/sagas'
import {watchProductLoadRequest} from './products/sagas'

export default function* IndexSaga () {
  yield [
    watchLoginRequest(),
    watchProductLoadRequest(),
  ]
}