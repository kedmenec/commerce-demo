import {watchLoginRequest, watchGetUserRequest} from './client/sagas'
import {watchProductLoadRequest} from './products/sagas'
import {watchAddToCartRequest, watchRemoveFromCartRequest, watchCheckoutRequest} from './cart/sagas'
import {watchSetCategoryFilterRequest} from './navigation/sagas'

export default function* IndexSaga () {
  yield [
    watchLoginRequest(),
    watchProductLoadRequest(),
    watchAddToCartRequest(),
    watchRemoveFromCartRequest(),
    watchSetCategoryFilterRequest(),
    watchGetUserRequest(),
    watchCheckoutRequest(),
  ]
}