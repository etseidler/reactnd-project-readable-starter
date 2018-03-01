/* globals fetch */
/* eslint no-use-before-define: "off" */
const AUTHORIZATION_HEADER = 'udacity-readable-eric-seidler'
const headers = { Authorization: AUTHORIZATION_HEADER }
const BASE_URL = 'http://localhost:3001'

export function getCategoriesRequest() {
  return fetch(`${BASE_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
}

export function getPostsRequest() {
  return fetch(`${BASE_URL}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export function getPostCommentsRequest(id) {
  return fetch(`${BASE_URL}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export function downvotePostRequest(id) {
  return voteItem('post', id, 'downVote')
}

export function upvotePostRequest(id) {
  return voteItem('post', id, 'upVote')
}

export function downvoteCommentRequest(id) {
  return voteItem('comment', id, 'downVote')
}

export function upvoteCommentRequest(id) {
  return voteItem('comment', id, 'upVote')
}

export function deletePostRequest(id) {
  return deleteItem('post', id)
}

export function deleteCommentRequest(id) {
  return deleteItem('comment', id)
}

export function createNewPostRequest(newPostData) {
  headers['Content-Type'] = 'application/json'
  const request = {
    headers,
    method: 'POST',
    body: JSON.stringify(newPostData)
  }
  return fetch(`${BASE_URL}/posts`, request)
    .then(res => res.json())
    .then(data => data)
}

export function editPostRequest(id, postData) {
  headers['Content-Type'] = 'application/json'
  const request = {
    headers,
    method: 'PUT',
    body: JSON.stringify(postData)
  }
  return fetch(`${BASE_URL}/posts/${id}`, request)
    .then(res => res.json())
    .then(data => data)
}

function voteItem(type, id, option) {
  headers['Content-Type'] = 'application/json'
  const request = {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option
    })
  }
  return fetch(`${BASE_URL}/${type}s/${id}`, request)
}

function deleteItem(type, id) {
  const request = {
    headers,
    method: 'DELETE'
  }
  return fetch(`${BASE_URL}/${type}s/${id}`, request)
}