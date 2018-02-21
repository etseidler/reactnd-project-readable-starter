import { combineReducers } from 'redux'
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  ADD_NEW_POST,
  DOWNVOTE,
  UPVOTE,
  UPDATE_SORT_ORDER
} from '../actions'

const defaultCategoryState = {
  byName: {},
  allNames: []
}

function categories(state = defaultCategoryState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES: {
      const allNames = action.categories.map(category => category.name)
      const byName = action.categories.reduce((acc, cur) => {
        acc[cur.name] = cur
        return acc
      }, {})
      return {
        byName,
        allNames
      }
    }
    default:
      return state
  }
}

const defaultPostState = {
  byId: {},
  allIds: [],
  sortOrder: 'none'
}

function posts(state = defaultPostState, action) {
  const { id: postId } = action
  const post = state && state.byId && state.byId[postId]
  switch (action.type) {
    case FETCH_POSTS: {
      const allIds = action.posts.map(p => p.id)
      const byId = action.posts.reduce((acc, cur) => {
        acc[cur.id] = cur
        return acc
      }, {})
      return {
        ...state,
        byId,
        allIds
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
        ]
      }
    case DOWNVOTE:
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
    case UPVOTE:
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
    case UPDATE_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.sortOrder
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})