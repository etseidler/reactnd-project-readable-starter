import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotFound from './NotFound'

class PostList extends Component {
  render() {
    const { postIds, postsById } = this.props;
    return (
      <div className="post-list">
        {postIds.length > 0
          ? postIds.map((postId) => {
            const { voteScore, title, commentCount } = postsById[postId]
            return (
              <div key={postId} className="post-item">
                <div className="post-vote-score">{voteScore.toString().padStart(5)}</div>
                <div className="post-title">{title}</div>
                <div className="post-comment-count">{commentCount} comment(s)</div>
              </div>
            )
          })
          :
          <NotFound text="No Posts Found" />
        }
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    postsById: posts.byId
  }
}

export default connect(
  mapStateToProps
)(PostList)
