import { combineReducers } from 'redux'
import {
  FETCH_CATEGORIES,
  FETCH_POSTS
} from '../actions'

function categories(state = [], action) {
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

function posts(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      const allIds = action.posts.map(post => post.id)
      const byId = action.posts.reduce((acc, cur) => {
        acc[cur.id] = cur
        delete cur.id
        return acc
      }, {})
      return {
        byId,
        allIds
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})