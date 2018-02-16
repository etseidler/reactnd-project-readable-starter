import React from 'react'

function PostListItem({ post: { voteScore, title, commentCount } }) {
  return (
    <div className="post-item">
      <div className="post-vote-score">{voteScore.toString().padStart(5)}</div>
      <div className="post-title">{title}</div>
      <div className="post-comment-count">{commentCount} comment(s)</div>
    </div>
  )
}

export default PostListItem