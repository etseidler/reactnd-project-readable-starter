import { combineReducers } from 'redux'
import { sortPostIds } from '../utils/helpers'
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  ADD_NEW_POST,
  CHANGE_CATEGORY,
  DOWNVOTE_POST,
  UPVOTE_POST,
  DELETE_POST,
  UPDATE_SORT_ORDER,
  OPEN_MODAL,
  CLOSE_MODAL
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
  sortOrder: 'none',
  category: undefined,
  categoryIds: []
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

const defaultModalState = {
  headerText: '',
  isOpen: false,
  post: {}
}

function modal(state = defaultModalState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        headerText: action.headerText,
        isOpen: true,
        post: { ...action.post }
      }
    }
    case CLOSE_MODAL:
      return {
        isOpen: false,
        post: {}
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  modal
})