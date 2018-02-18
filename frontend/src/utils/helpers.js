export function capitalize(str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

function sortDescending(first, second) {
  return first > second ? -1 : 1
}

function sortAscending(first, second) {
  return first < second ? -1 : 1
}

const sortValuesMap = {
  voteScore: {
    sortFunction: sortDescending,
    sortProp: 'voteScore'
  },
  title: {
    sortFunction: sortAscending,
    sortProp: 'title'
  },
  timestampAscending: {
    sortFunction: sortAscending,
    sortProp: 'timestamp'
  },
  timestampDescending: {
    sortFunction: sortDescending,
    sortProp: 'timestamp'
  }
}

export function sortPostIds(postIds, postsById, sortOrder) {
  const sortProp = sortValuesMap[sortOrder].sortProp
  return postIds.sort((a, b) => {
    const first = postsById[a][sortProp]
    const second = postsById[b][sortProp]
    return sortValuesMap[sortOrder].sortFunction(first, second)
  })
}