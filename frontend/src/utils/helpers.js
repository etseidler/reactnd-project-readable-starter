/* eslint no-use-before-define: "off" */
export function capitalize(str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function sortPostIds(postIds, postsById, sortOrder) {
  const { [sortOrder]: { sortProp } } = sortOrderMap
  return postIds.slice().sort((a, b) => {
    const first = postsById[a][sortProp]
    const second = postsById[b][sortProp]
    return sortOrderMap[sortOrder].sortFunction(first, second)
  })
}

function sortDescending(first, second) {
  return first > second ? -1 : 1
}

function sortAscending(first, second) {
  return first < second ? -1 : 1
}

export const sortOrderMap = {
  voteScore: {
    sortFunction: sortDescending,
    sortProp: 'voteScore',
    sortDisplayValue: 'Vote Score'
  },
  title: {
    sortFunction: sortAscending,
    sortProp: 'title',
    sortDisplayValue: 'Title'
  },
  timestampAscending: {
    sortFunction: sortAscending,
    sortProp: 'timestamp',
    sortDisplayValue: 'Date (oldest first)'
  },
  timestampDescending: {
    sortFunction: sortDescending,
    sortProp: 'timestamp',
    sortDisplayValue: 'Date (newest first)'
  }
}