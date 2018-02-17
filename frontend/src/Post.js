import React from 'react'

function Post({ post: { voteScore, title, commentCount } }) {
  return (
    <div className="post-item">
      <div className="post-vote">
      <div className="post-vote-score">{voteScore.toString().padStart(5)}</div>
        <div className="post-vote-controls">
          <i className="post-vote-icon icon ion-arrow-up-a"></i>
          <i className="post-vote-icon icon ion-arrow-down-a"></i>
        </div>
      </div>
      <div className="post-title">{title}</div>
      <div className="post-comment-count">{commentCount} comment(s)</div>
    </div>
  )
}

export default Post