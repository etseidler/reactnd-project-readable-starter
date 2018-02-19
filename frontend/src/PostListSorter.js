import React from 'react'

function PostListSorter({ onChange, sortOrder }) {
  return (
    <div className="post-list-sort-control">
      <select onChange={onChange} value={sortOrder} >
        <option value="none" disabled>Select a Sort Order</option>
        <option value="voteScore">Vote Score</option>
        <option value="timestampDescending">Date (newest first)</option>
        <option value="timestampAscending">Date (oldest first)</option>
        <option value="title">Title</option>
      </select>
    </div>
  )
}

export default PostListSorter