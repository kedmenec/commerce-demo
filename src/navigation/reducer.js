const initialSate = {
  filter: null
}

const reducer = function productReducer (state = initialSate, action) {
  switch (action.type) {
    case 'SET_CATEGORY_SUCCESS':
      return {
        filter: action.payload
      }
    default:
      return state
  }
}

export default reducer