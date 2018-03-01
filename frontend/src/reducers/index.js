import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import modal from './modal'
import comments from './comments'

export default combineReducers({
  categories,
  posts,
  modal,
  comments
})