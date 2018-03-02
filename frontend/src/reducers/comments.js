import {
  LOAD_POST_COMMENTS,
  DOWNVOTE_COMMENT,
  UPVOTE_COMMENT,
  DELETE_COMMENT,
  ADD_NEW_COMMENT
} from '../actions'

const defaultCommentsState = {
  allIds: [],
  byId: {}
}

function comments(state = defaultCommentsState, action) {
  const { id: commentId } = action
  const comment = state && state.byId && state.byId[commentId]
  switch (action.type) {
    case LOAD_POST_COMMENTS:
      return {
        allIds: action.comments.map(c => c.id),
        byId: action.comments.reduce((acc, cur) => {
          acc[cur.id] = cur
          return acc
        }, {})
      }
    case DOWNVOTE_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [commentId]: {
            ...comment,
            voteScore: comment.voteScore - 1
          }
        }
      }
    case UPVOTE_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [commentId]: {
            ...comment,
            voteScore: comment.voteScore + 1
          }
        }
      }
    case DELETE_COMMENT:
      return {
        ...state,
        allIds: [...state.allIds.filter(id => id !== action.id)]
      }
    case ADD_NEW_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        },
        allIds: [...state.allIds, action.comment.id]
      }
    default:
      return state
  }
}

export default comments