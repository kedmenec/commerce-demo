import { PRODUCT_LOAD_SUCCESS } from './constants'

const initialSate = {
  products: []
}

const reducer = function productReducer (state = initialSate, action) {
  switch (action.type) {
    case PRODUCT_LOAD_SUCCESS:
    console.log('action')
    console.dir(action)
      return {
        products: action.payload
      }

    // case CLIENT_UNSET:
    //   return {
    //     id: null,
    //     token: null,
    //   }

    default:
      return state
  }
}

export default reducer