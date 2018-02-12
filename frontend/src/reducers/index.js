import { combineReducers } from 'redux'
import {
  FETCH_CATEGORIES,
  FETCH_POSTS
} from '../actions'

function categories(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      const ids = action.posts.map(post => post.id)
      const posts = action.posts.reduce((acc, cur) => {
        acc[cur.id] = cur
        delete cur.id
        return acc
      }, {})
      return {
        posts,
        ids
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})