export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const DOWNVOTE = 'DOWNVOTE'
export const UPVOTE = 'UPVOTE'

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

export function downvote(id) {
  return {
    type: DOWNVOTE,
    id
  }
}

export function upvote(id) {
  return {
    type: UPVOTE,
    id
  }
}