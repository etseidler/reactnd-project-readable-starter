import React, { Component } from 'react'
import { connect } from 'react-redux'
import { downvotePost, upvotePost, deletePost, openModal } from './actions'
import { downvotePostRequest, upvotePostRequest, deletePostRequest } from './utils/api'

class Post extends Component {
  downvote(id) {
    downvotePostRequest(id).then(() => this.props.downvote(id))
  }
  upvote(id) {
    upvotePostRequest(id).then(() => this.props.upvote(id))
  }
  delete(id) {
    deletePostRequest(id).then(() => this.props.delete(id))
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
        <div className="post-modify-controls">
          <i className="post-edit-icon icon ion-edit" onClick={() => this.props.openModal()} />
          <i className="post-delete-icon icon ion-trash-b" onClick={() => this.delete(id)} />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const { title, author, category, body, id: postId } = ownProps.post
  return {
    downvote: id => dispatch(downvotePost(id)),
    upvote: id => dispatch(upvotePost(id)),
    delete: id => dispatch(deletePost(id)),
    openModal: () => dispatch(openModal(
      'Edit Post',
      {
        title,
        author,
        category,
        body,
        id: postId
      }
    ))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Post)