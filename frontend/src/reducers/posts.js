import { sortPostIds } from '../utils/helpers'
import {
  LOAD_POSTS,
  ADD_NEW_POST,
  UPDATE_POST,
  CHANGE_CATEGORY,
  DOWNVOTE_POST,
  UPVOTE_POST,
  DELETE_POST,
  UPDATE_SORT_ORDER
} from '../actions'

const defaultPostState = {
  byId: {},
  allIds: [],
  sortOrder: 'none',
  category: undefined,
  categoryIds: []
}

function posts(state = defaultPostState, action) {
  const { id: postId } = action
  const post = state && state.byId && state.byId[postId]
  switch (action.type) {
    case LOAD_POSTS: {
      const allIds = action.posts.map(p => p.id)
      const byId = action.posts.reduce((acc, cur) => {
        acc[cur.id] = cur
        return acc
      }, {})
      return {
        ...state,
        byId,
        allIds,
        categoryIds: allIds
      }
    }
    case ADD_NEW_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post
        },
        allIds: [
          ...state.allIds,
          action.post.id
        ],
        categoryIds: action.post.category === state.category || !state.category
          ? [...state.categoryIds, action.post.id]
          : state.categoryIds
      }
    case UPDATE_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post
        }
      }
    case CHANGE_CATEGORY:
      return {
        ...state,
        category: action.category,
        categoryIds: state.allIds
          .filter(id => !action.category || state.byId[id].category === action.category)
      }
    case DOWNVOTE_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [postId]: {
            ...post,
            voteScore: post.voteScore - 1
          }
        }
      }
    case UPVOTE_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [postId]: {
            ...post,
            voteScore: post.voteScore + 1
          }
        }
      }
    case DELETE_POST:
      return {
        ...state,
        allIds: [...state.allIds.filter(id => id !== action.id)],
        categoryIds: [...state.categoryIds.filter(id => id !== action.id)]
      }
    case UPDATE_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.sortOrder,
        categoryIds: action.sortOrder === 'none' ? state.categoryIds : sortPostIds(state.categoryIds, state.byId, action.sortOrder)
      }
    default:
      return state
  }
}

export default posts