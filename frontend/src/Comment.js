import React from 'react'

function Comment({ comment }) {
  const {
    author,
    voteScore,
    body
  } = comment
  return (
    <div className="comment">
      <div className="comment-body">{body}</div>
      <div className="comment-author">{author}</div>
      <div className="comment-vote-score">{voteScore}</div>
    </div>
  )
}

export default Comment