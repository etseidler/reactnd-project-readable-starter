import {
  LOAD_POST_COMMENTS,
  DOWNVOTE_COMMENT,
  UPVOTE_COMMENT
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
    default:
      return state
  }
}

export default comments