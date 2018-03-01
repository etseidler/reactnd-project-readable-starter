import React, { Component } from 'react'
import { connect } from 'react-redux'
import { downvoteCommentRequest, upvoteCommentRequest, deleteCommentRequest } from './utils/api'
import { downvoteComment, upvoteComment, deleteComment } from './actions'
import VoteControl from './VoteControl'
import ModifyControl from './ModifyControl'

class Comment extends Component {
  constructor(props) {
    super(props)

    this.upvote = this.upvote.bind(this)
    this.downvote = this.downvote.bind(this)
  }
  downvote(id) {
    downvoteCommentRequest(id).then(() => this.props.downvote(id))
  }
  upvote(id) {
    upvoteCommentRequest(id).then(() => this.props.upvote(id))
  }
  delete(id) {
    deleteCommentRequest(id).then(() => this.props.delete(id))
  }
  render() {
    const {
      author,
      voteScore,
      body,
      id
    } = this.props.comment
    return (
      <div className="comment">
        <div className="comment-body">{body}</div>
        <div className="comment-author">{author}</div>
        <div className="comment-vote-score">{voteScore}</div>
        <VoteControl upvote={() => this.upvote(id)} downvote={() => this.downvote(id)} />
        <ModifyControl onEdit={() => {}} onDelete={() => this.delete(id)} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downvote: id => dispatch(downvoteComment(id)),
    upvote: id => dispatch(upvoteComment(id)),
    delete: id => dispatch(deleteComment(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment)