import { combineReducers } from 'redux'
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  DOWNVOTE,
  UPVOTE
} from '../actions'

const defaultCategoryState = {
  byName: {},
  allNames: []
}

function categories(state = defaultCategoryState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      const allNames = action.categories.map(category => category.name)
      const byName = action.categories.reduce((acc, cur) => {
        acc[cur.name] = cur
        return acc
      }, {})
      return {
        byName,
        allNames
      }
    default:
      return state
  }
}

const defaultPostState = {
  byId: {},
  allIds: [],
  sortOrder: undefined
}

function posts(state = defaultPostState, action) {
  const { id: postId } = action
  const post = state && state.byId && state.byId[postId]
  switch (action.type) {
    case FETCH_POSTS:
      const allIds = action.posts.map(post => post.id)
      const byId = action.posts.reduce((acc, cur) => {
        acc[cur.id] = cur
        return acc
      }, {})
      return {
        byId,
        allIds
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
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})