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