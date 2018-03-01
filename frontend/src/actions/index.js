export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_POST_COMMENTS = 'LOAD_POST_COMMENTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const UPDATE_SORT_ORDER = 'UPDATE_SORT_ORDER'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'

export function loadCategories(categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}

export function loadPosts(posts) {
  return {
    type: LOAD_POSTS,
    posts
  }
}

export function loadPostComments(comments) {
  return {
    type: LOAD_POST_COMMENTS,
    comments
  }
}

export function addNewPost(post) {
  return {
    type: ADD_NEW_POST,
    post
  }
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
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

export function downvoteComment(id) {
  return {
    type: DOWNVOTE_COMMENT,
    id
  }
}

export function upvoteComment(id) {
  return {
    type: UPVOTE_COMMENT,
    id
  }
}