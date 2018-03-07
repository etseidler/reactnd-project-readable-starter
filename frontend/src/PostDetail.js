import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuid from 'uuid/v4'
import {
  changeCategory,
  loadPostComments,
  addNewComment,
  addPostComment
} from './actions'
import {
  getPostCommentsRequest,
  createNewCommentRequest
} from './utils/api'
import Comment from './Comment'
import Post from './Post'

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
    this.redirectToMainPage = this.redirectToMainPage.bind(this)
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
  redirectToMainPage() {
    this.props.history.push('/')
  }
  render() {
    const { post } = this.props
    return (
      <div className="post-detail">
        <Post
          post={post}
          onDelete={this.redirectToMainPage}
          detailMode
        />
        <div className="post-detail-comments">
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

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: category => dispatch(changeCategory(category)),
    loadPostComments: comments => dispatch(loadPostComments(comments)),
    addNewComment: comment => dispatch(addNewComment(comment)),
    addPostComment: postId => dispatch(addPostComment(postId))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail))
