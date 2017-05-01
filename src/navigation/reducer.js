const initialSate = {
  filter: null
}

const reducer = function productReducer(state = initialSate, action) {
  switch (action.type) {
    case 'SET_CATEGORY_SUCCESS':

      // If the filter is already set to whats in the action payload, unset it.  This
      // makes it work like a toggle.
      let new_filter = action.payload;
      if (new_filter === state.filter) {
        new_filter = ''
      }

      return {filter: new_filter}
    default:
      return state
  }
}

export default reducer