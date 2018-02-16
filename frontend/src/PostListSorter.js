import React from 'react'

function PostListSorter(props) {
  const { onChange, sortOrder, defaultValue } = props
  return (
    <div className="post-list-sort-control">
      <select onChange={onChange} value={sortOrder} >
        <option value={defaultValue} disabled>Select a Sort Order</option>
        <option value="voteScore">Vote Score</option>
        <option value="timestampDescending">Date (newest first)</option>
        <option value="timestampAscending">Date (oldest first)</option>
        <option value="title">Title</option>
      </select>
    </div>
  )
}

export default PostListSorter