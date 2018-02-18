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