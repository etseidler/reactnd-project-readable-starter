import React from 'react'
import { Link } from 'react-router-dom'

function PostList(props) {
  const { posts: { ids: postIds, posts }, postIdsInCategory } = props;
  const filteredPostIds = postIds
    .filter(postId => postIdsInCategory === undefined || postIdsInCategory.includes(postId))
  return (
    <div className="post-list">
      {filteredPostIds.length > 0
        ? filteredPostIds.map(postId => (
          <div key={postId} className="post-item">
            <div className="post-vote-score">{posts[postId].voteScore.toString().padStart(5)}</div>
            <div className="post-title">{posts[postId].title}</div>
            <div className="post-comment-count">{posts[postId].commentCount} comment(s)</div>
          </div>
        ))
        :
        <div className="page-not-found">
          <div className="page-not-found__main-text">No Posts Found</div>
          <div className="page-not-found__return-to-main">
            <Link to='/'>Return to Main Page</Link>
          </div>
        </div>
      }
    </div>
  )
}

export default PostList