export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const UPDATE_SORT_ORDER = 'UPDATE_SORT_ORDER'

export function fetchCategories(categories) {
  return {
    type: FETCH_CATEGORIES,
    categories
  }
}

export function fetchPosts(posts) {
  return {
    type: FETCH_POSTS,
    posts
  }
}

export function addNewPost(post) {
  return {
    type: ADD_NEW_POST,
    post
  }
}

export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY,
    category
  }
}

export function downvotePost(id) {
  return {
    type: DOWNVOTE_POST,
    id
  }
}

export function upvotePost(id) {
  return {
    type: UPVOTE_POST,
    id
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

export function openModal(headerText, post = {}) {
  return {
    type: OPEN_MODAL,
    headerText,
    post
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function updateSortOrder(sortOrder) {
  return {
    type: UPDATE_SORT_ORDER,
    sortOrder
  }
}