import React, { Component } from 'react'
import { connect } from 'react-redux'
import { downvoteCommentRequest, upvoteCommentRequest, deleteCommentRequest, editCommentRequest } from './utils/api'
import { downvoteComment, upvoteComment, deleteComment, updateComment, deletePostComment } from './actions'
import VoteControl from './VoteControl'
import ModifyControl from './ModifyControl'

class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      body: props.comment.body,
      editMode: false,
      submitDisabled: true
    }

    this.upvote = this.upvote.bind(this)
    this.downvote = this.downvote.bind(this)
    this.delete = this.delete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange({ target: { value } }) {
    const submitDisabled = !value
    this.setState({
      body: value,
      submitDisabled
    })
  }
  handleCancel() {
    this.setState({
      body: this.props.comment.body,
      editMode: false,
      submitDisabled: true
    })
  }
  handleSubmit() {
    const updateCommentData = {
      body: this.state.body
    }
    editCommentRequest(this.props.comment.id, updateCommentData)
      .then(this.props.update)
    this.setState({
      editMode: false,
      submitDisabled: true
    })
  }
  downvote(id) {
    downvoteCommentRequest(id).then(() => this.props.downvote(id))
  }
  upvote(id) {
    upvoteCommentRequest(id).then(() => this.props.upvote(id))
  }
  delete(id) {
    deleteCommentRequest(id).then(() => {
      this.props.delete(id)
      this.props.deletePostComment(this.props.comment.parentId)
    })
  }
  render() {
    const {
      author,
      voteScore,
      body,
      id
    } = this.props.comment
    return this.state.editMode
      ? (
        <div className="comment-edit-mode">
          <textarea defaultValue={this.state.body} onChange={this.handleChange} />
          <button onClick={this.handleCancel}>Cancel</button>
          <button
            onClick={this.handleSubmit}
            disabled={this.state.submitDisabled}
          >
            Submit
          </button>
        </div>
      )
      : (
        <div className="comment">
          <div className="comment-body">{body}</div>
          <div className="comment-author">{author}</div>
          <div className="comment-vote-score">{voteScore}</div>
          <VoteControl upvote={() => this.upvote(id)} downvote={() => this.downvote(id)} />
          <ModifyControl
            onEdit={() => this.setState({ editMode: true })}
            onDelete={() => this.delete(id)}
          />
        </div>
      )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downvote: id => dispatch(downvoteComment(id)),
    upvote: id => dispatch(upvoteComment(id)),
    delete: id => dispatch(deleteComment(id)),
    update: comment => dispatch(updateComment(comment)),
    deletePostComment: postId => dispatch(deletePostComment(postId))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment)