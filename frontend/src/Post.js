import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import VoteControl from './VoteControl'
import ModifyControl from './ModifyControl'
import {
  downvotePost,
  upvotePost,
  deletePost,
  openModal
} from './actions'
import {
  downvotePostRequest,
  upvotePostRequest,
  deletePostRequest
} from './utils/api'

class Post extends Component {
  constructor(props) {
    super(props)

    this.upvote = this.upvote.bind(this)
    this.downvote = this.downvote.bind(this)
    this.delete = this.delete.bind(this)
  }
  downvote(id) {
    downvotePostRequest(id).then(() => this.props.downvote(id))
  }
  upvote(id) {
    upvotePostRequest(id).then(() => this.props.upvote(id))
  }
  delete(id) {
    deletePostRequest(id).then(() => {
      this.props.delete(id)
      if (this.props.onDelete) {
        this.props.onDelete()
      }
    })
  }
  render() {
    const {
      post: {
        id,
        voteScore,
        title,
        commentCount,
        author,
        category,
        body
      },
      detailMode
    } = this.props
    return (
      <div className="post-item">
        <div className="post-vote">
          <div className="post-vote-score">{voteScore.toString().padStart(4)}</div>
          <VoteControl upvote={() => this.upvote(id)} downvote={() => this.downvote(id)} />
        </div>
        <div className="post-main">
          <div className="post-title">
            {detailMode ? title : <Link to={`/${category}/${id}`}>{title}</Link> }
          </div>
          {detailMode ? <div className="post-body">{body}</div> : null}
          <div className="post-minor">
            <div className="post-comment-count">{commentCount} comment{commentCount !== 1 ? 's' : ''}</div>
            <div className="post-author">by {author}</div>
          </div>
        </div>
        <ModifyControl
          onEdit={() => this.props.openModal('Edit Post', { title, author, category, body, id })}
          onDelete={() => this.delete(id)}
        />
      </div>
    )
  }
}

export default connect(
  null,
  {
    downvote: downvotePost,
    upvote: upvotePost,
    delete: deletePost,
    openModal
  }
)(Post)