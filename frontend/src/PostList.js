import React from 'react'
import NotFound from './NotFound'

function PostList(props) {
  const { posts: { allIds: postIds, byId: posts }, postIdsInCategory } = props;
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
        <NotFound text="No Posts Found" />
      }
    </div>
  )
}

export default PostList