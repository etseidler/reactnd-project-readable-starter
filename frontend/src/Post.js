import React, { Component } from 'react'
import { connect } from 'react-redux'
import { downvote, upvote } from './actions'
import { downvotePost, upvotePost } from './utils/api'

class Post extends Component {
  downvote(id) {
    downvotePost(id).then(() => this.props.downvote(id))
  }
  upvote(id) {
    upvotePost(id).then(() => this.props.upvote(id))
  }
  render() {
    const { post:
      { id, voteScore, title, commentCount, author }
    } = this.props
    return (
      <div className="post-item">
        <div className="post-vote">
          <div className="post-vote-score">{voteScore.toString().padStart(5)}</div>
          <div className="post-vote-controls">
            <i className="post-vote-icon icon ion-arrow-up-a" onClick={() => this.upvote(id)} />
            <i className="post-vote-icon icon ion-arrow-down-a" onClick={() => this.downvote(id)} />
          </div>
        </div>
        <div className="post-main">
          <div className="post-title">{title}</div>
          <div className="post-minor">
            <div className="post-comment-count">{commentCount} comment{commentCount !== 1 ? 's' : ''}</div>
            <div className="post-author">by {author}</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downvote: id => dispatch(downvote(id)),
    upvote: id => dispatch(upvote(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Post)