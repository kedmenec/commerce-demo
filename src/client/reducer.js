import {CLIENT_SET, CLIENT_UNSET} from './constants'

const initialSate = {
  token: null,
  id: null,
  username: null
}

const reducer = function clientReducer(state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      // console.log(action)
      return {
        // id: action.token.userId,
        token: action.payload.token
      }

    case CLIENT_UNSET:
      return Object.assign({}, state, initialSate);

    case 'USER_DETAIL_SUCESS':
      return Object.assign({}, state, {
        id: action.payload.id,
        username: action.payload.username
      });

    default:
      return state
  }
}

export default reducer