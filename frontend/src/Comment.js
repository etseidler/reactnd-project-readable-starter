import React, { Component } from 'react'
import { connect } from 'react-redux'
import { downvoteCommentRequest, upvoteCommentRequest } from './utils/api'
import { downvoteComment, upvoteComment } from './actions'
import VoteControl from './VoteControl'

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
        <VoteControl upvote={this.upvote} downvote={this.downvote} id={id} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downvote: id => dispatch(downvoteComment(id)),
    upvote: id => dispatch(upvoteComment(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment)