import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import VoteControl from './VoteControl'
import { downvotePost, upvotePost, deletePost, openModal } from './actions'
import { downvotePostRequest, upvotePostRequest, deletePostRequest } from './utils/api'

class Post extends Component {
  constructor(props) {
    super(props)

    this.upvote = this.upvote.bind(this)
    this.downvote = this.downvote.bind(this)
  }
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
      { id, voteScore, title, commentCount, author, category }
    } = this.props
    return (
      <div className="post-item">
        <div className="post-vote">
          <div className="post-vote-score">{voteScore.toString().padStart(5)}</div>
          <VoteControl upvote={this.upvote} downvote={this.downvote} id={id} />
        </div>
        <div className="post-main">
          <div className="post-title"><Link to={`/${category}/${id}`}>{title}</Link></div>
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