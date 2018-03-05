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

export function createNewCommentRequest(newData) {
  return createItem('comment', newData)
}

export function editCommentRequest(id, updateData) {
  return editItem('comment', id, updateData)
}

export function createNewPostRequest(newData) {
  return createItem('post', newData)
}

export function editPostRequest(id, updateData) {
  return editItem('post', id, updateData)
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

function createItem(type, newData) {
  headers['Content-Type'] = 'application/json'
  const request = {
    headers,
    method: 'POST',
    body: JSON.stringify(newData)
  }
  return fetch(`${BASE_URL}/${type}s`, request)
    .then(res => res.json())
    .then(data => data)
}

function editItem(type, id, updateData) {
  headers['Content-Type'] = 'application/json'
  const request = {
    headers,
    method: 'PUT',
    body: JSON.stringify(updateData)
  }
  return fetch(`${BASE_URL}/${type}s/${id}`, request)
    .then(res => res.json())
    .then(data => data)
}