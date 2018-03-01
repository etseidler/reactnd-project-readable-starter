import { LOAD_POST_COMMENTS } from '../actions'

const defaultCommentsState = {
  allIds: [],
  byId: {}
}

function comments(state = defaultCommentsState, action) {
  switch (action.type) {
    case LOAD_POST_COMMENTS:
      return {
        allIds: action.comments.map(c => c.id),
        byId: action.comments.reduce((acc, cur) => {
          acc[cur.id] = cur
          return acc
        }, {})
      }
    default:
      return state
  }
}

export default comments