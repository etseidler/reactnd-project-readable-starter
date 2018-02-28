import React from 'react'

function PostDetail(props) {
  const { title, body, author, commentCount, voteScore } = props.post
  return (
    <div className="post-detail">
      <div className="post-detail-title">{title}</div>
      <div className="post-detail-body">{body}</div>
      <div className="post-detail-author">{author}</div>
      <div className="post-detail-comment-count">{commentCount}</div>
      <div className="post-detail-voteScore">{voteScore}</div>
    </div>
  )
}

export default PostDetail