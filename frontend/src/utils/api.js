/* globals fetch */
/* eslint no-use-before-define: "off" */
const AUTHORIZATION_HEADER = 'udacity-readable-eric-seidler'
const headers = { Authorization: AUTHORIZATION_HEADER }
const BASE_URL = 'http://localhost:3001'

export function getCategories() {
  return fetch(`${BASE_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
}

export function getPosts() {
  return fetch(`${BASE_URL}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export function downvotePost(id) {
  return votePost(id, 'downVote')
}

export function upvotePost(id) {
  return votePost(id, 'upVote')
}

export function createNewPost(newPostData) {
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

function votePost(id, option) {
  headers['Content-Type'] = 'application/json'
  const request = {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option
    })
  }
  return fetch(`${BASE_URL}/posts/${id}`, request)
}