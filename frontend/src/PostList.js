import React from 'react'
import NotFound from './NotFound'

function PostList(props) {
  const { posts: { allIds, byId: postsById }, includeOnlyTheseIds } = props;
  const postIds = allIds
    .filter(postId => includeOnlyTheseIds === undefined || includeOnlyTheseIds.includes(postId))
  return (
    <div className="post-list">
      {postIds.length > 0
        ? postIds.map((postId) => {
          const { voteScore, title, commentCount } = postsById[postId]
          return <div key={postId} className="post-item">
            <div className="post-vote-score">{voteScore.toString().padStart(5)}</div>
            <div className="post-title">{title}</div>
            <div className="post-comment-count">{commentCount} comment(s)</div>
          </div>
        })
        :
        <NotFound text="No Posts Found" />
      }
    </div>
  )
}

export default PostList