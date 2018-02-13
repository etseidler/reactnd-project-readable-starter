import React from 'react'

function PostList(props) {
  const { posts: { ids: postIds, posts }} = props;
  return (
    <div className="post-list">
      {postIds
        .map(postId => (
          <div key={postId} className="post-item">
            <div className="post-vote-score">{posts[postId].voteScore.toString().padStart(5)}</div>
            <div className="post-title">{posts[postId].title}</div>
            <div className="post-comment-count">{posts[postId].commentCount} comment(s)</div>
          </div>
        ))
      }
    </div>
  )
}

export default PostList