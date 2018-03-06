import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuid from 'uuid/v4'
import { changeCategory, loadPostComments, addNewComment, addPostComment, deletePost, openModal, downvotePost, upvotePost } from './actions'
import { getPostCommentsRequest, createNewCommentRequest, deletePostRequest, downvotePostRequest, upvotePostRequest } from './utils/api'
import Comment from './Comment'
import ModifyControl from './ModifyControl'
import VoteControl from './VoteControl'

class PostDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentBody: '',
      commentAuthor: '',
      submitDisabled: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.delete = this.delete.bind(this)
  }
  componentDidMount() {
    this.props.changeCategory(this.props.post.category)
    getPostCommentsRequest(this.props.post.id).then(this.props.loadPostComments)
  }
  handleChange({ target: { name, value } }) {
    this.setState(
      { [name]: value },
      () => {
        const { commentBody, commentAuthor } = this.state
        const submitDisabled = !(commentBody && commentAuthor)
        this.setState({ submitDisabled })
      }
    );
  }
  handleSubmit() {
    const newCommentData = {
      timestamp: Date.now(),
      id: uuid(),
      body: this.state.commentBody,
      author: this.state.commentAuthor,
      parentId: this.props.post.id
    }
    createNewCommentRequest(newCommentData).then((comment) => {
      this.props.addNewComment(comment)
      this.props.addPostComment(this.props.post.id)
    })
    this.setState({
      commentBody: '',
      commentAuthor: '',
      submitDisabled: true
    })
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
      this.props.history.push('/')
    })
  }
  render() {
    const { title, body, author, commentCount, voteScore, id } = this.props.post
    return (
      <div className="post-detail">
        <div className="post-detail-title">{title}</div>
        <div className="post-detail-body">{body}</div>
        <div className="post-detail-author">{author}</div>
        <div className="post-detail-comment-count">{commentCount}</div>
        <div className="post-detail-voteScore">{voteScore}</div>
        <VoteControl upvote={() => this.upvote(id)} downvote={() => this.downvote(id)} />
        <ModifyControl onEdit={this.props.openModal} onDelete={() => this.delete(id)} />
        <div className="post-detail-comments">
          <div className="comments-header">Comments</div>
          <div className="comments-add-new">
            <div className="comments-add-new-header">Add New Comment</div>
            <label htmlFor="comment-body">
              Comment
              <br />
              <textarea
                name="commentBody"
                value={this.state.commentBody}
                id="comment-body"
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label htmlFor="comment-author">
              Author
              <br />
              <input
                name="commentAuthor"
                id="comment-author"
                value={this.state.commentAuthor}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <button
              className="comment-submit"
              onClick={this.handleSubmit}
              disabled={this.state.submitDisabled}
            >
              Submit
            </button>
          </div>
          <div className="comments-list">
            {this.props.comments.allIds.map(commentId => (
              <Comment key={commentId} comment={this.props.comments.byId[commentId]} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {
    title,
    author,
    category: editPostCategory,
    body,
    id: editPostId
  } = ownProps.post
  return {
    changeCategory: category => dispatch(changeCategory(category)),
    loadPostComments: comments => dispatch(loadPostComments(comments)),
    addNewComment: comment => dispatch(addNewComment(comment)),
    addPostComment: postId => dispatch(addPostComment(postId)),
    delete: id => dispatch(deletePost(id)),
    downvote: id => dispatch(downvotePost(id)),
    upvote: id => dispatch(upvotePost(id)),
    openModal: () => dispatch(openModal(
      'Edit Post',
      {
        title,
        author,
        category: editPostCategory,
        body,
        id: editPostId
      }
    ))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail))
