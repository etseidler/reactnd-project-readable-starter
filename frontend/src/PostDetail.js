import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { changeCategory, loadPostComments, addNewComment } from './actions'
import { getPostCommentsRequest, createNewCommentRequest } from './utils/api'
import Comment from './Comment'

class PostDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentBody: '',
      commentAuthor: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.changeCategory(this.props.post.category)
    getPostCommentsRequest(this.props.post.id).then(this.props.loadPostComments)
  }
  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  handleSubmit() {
    const newCommentData = {
      timestamp: Date.now(),
      id: uuid(),
      body: this.state.commentBody,
      author: this.state.commentAuthor,
      parentId: this.props.post.id
    }
    createNewCommentRequest(newCommentData).then(this.props.addNewComment)
    this.setState({ commentBody: '', commentAuthor: '' })
  }
  render() {
    const { title, body, author, commentCount, voteScore } = this.props.post
    return (
      <div className="post-detail">
        <div className="post-detail-title">{title}</div>
        <div className="post-detail-body">{body}</div>
        <div className="post-detail-author">{author}</div>
        <div className="post-detail-comment-count">{commentCount}</div>
        <div className="post-detail-voteScore">{voteScore}</div>
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
            >
              Submit
            </button>
          </div>
          <div className="comments-list">
            {this.props.comments.allIds.map(id => (
              <Comment key={id} comment={this.props.comments.byId[id]} />
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
    addNewComment: comment => dispatch(addNewComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
