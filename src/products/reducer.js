import {PRODUCT_LOAD_SUCCESS} from './constants'

const initialSate = {
  products: []
}

const reducer = function productReducer(state = initialSate, action) {
  switch (action.type) {
    case PRODUCT_LOAD_SUCCESS:
      return Object.assign({}, state, {products: action.payload});

    default:
      return state
  }
}

export default reducer