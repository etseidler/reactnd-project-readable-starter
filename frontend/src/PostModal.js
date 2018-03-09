/* globals document */
/* eslint no-use-before-define: "off" */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import uuid from 'uuid/v4'
import {
  addNewPost,
  closeModal,
  updatePost
} from './actions'
import { createNewPostRequest, editPostRequest } from './utils/api'
import { capitalize } from './utils/helpers'

class PostModal extends Component {
  constructor(props) {
    super(props)
    const { categories, isOpen, title, author, category, body } = props
    const firstCategoryName = categories.allNames[0]

    this.state = {
      isOpen,
      title,
      author,
      category: category || firstCategoryName,
      firstCategoryName,
      body,
      submitDisabled: true
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetFormState = this.resetFormState.bind(this)
    this.validateFormFields = this.validateFormFields.bind(this)
    this.createNewPost = this.createNewPost.bind(this)
    this.editPost = this.editPost.bind(this)
  }
  componentWillReceiveProps({ category, title, author, body }) {
    if (category !== this.state.category) {
      this.setState({ category: category || this.state.firstCategoryName })
    }
    this.setState({
      title,
      author,
      body
    })
  }
  validateFormFields() {
    const fieldsToValidate = ['title', 'author', 'body']
    let submitDisabled = false
    fieldsToValidate.forEach((field) => {
      if (!this.state[field] || this.state[field].length === 0) {
        submitDisabled = true
      }
    })
    this.setState({ submitDisabled })
  }
  handleFieldChange({ target: { name, value } }) {
    this.setState(
      { [name]: value },
      this.validateFormFields
    );
  }
  dismiss() {
    this.resetFormState()
    this.props.closeModal()
  }
  resetFormState() {
    this.setState({
      title: '',
      author: '',
      body: '',
      submitDisabled: true
    })
  }
  createNewPost() {
    const { title, author, category, body } = this.state
    const newPostData = {
      timestamp: Date.now(),
      id: uuid(),
      title,
      author,
      category,
      body
    }
    createNewPostRequest(newPostData).then(this.props.addNewPost)
  }
  editPost(id) {
    const { title, body } = this.state
    const postData = {
      title,
      body
    }
    editPostRequest(id, postData).then(this.props.updatePost)
  }
  handleSubmit() {
    if (this.props.id) {
      this.editPost(this.props.id)
    }
    else {
      this.createNewPost()
    }
    this.dismiss()
  }
  render() {
    const { headerText, id: postId, categories } = this.props
    return (
      <Modal
        appElement={document.getElementById('root')}
        isOpen={this.props.isOpen}
        style={modalStyles}
      >
        <div className="modal-container">
          <div className="modal-header">{headerText}</div>
          <div className="modal-body">
            <div className="post-form">
              <label htmlFor="post-title">
                Title
                <br />
                <input
                  name="title"
                  defaultValue={this.state.title}
                  onChange={this.handleFieldChange}
                  id="post-title"
                />
              </label>
              <label htmlFor="post-author">
                Author
                <br />
                <input
                  name="author"
                  id="post-author"
                  defaultValue={this.state.author}
                  onChange={this.handleFieldChange}
                  disabled={postId}
                />
              </label>
              <label htmlFor="post-body">
                Category
                <br />
                <select
                  name="category"
                  id="post-category"
                  defaultValue={this.state.category}
                  onChange={this.handleFieldChange}
                  disabled={postId}
                >
                  {categories.allNames
                    .map(categoryName => (
                      <option key={categoryName} value={categoryName}>
                        {capitalize(categoryName)}
                      </option>
                    ))
                  }
                </select>
              </label>
              <label htmlFor="post-body">
                Post
                <br />
                <textarea
                  name="body"
                  id="post-body"
                  defaultValue={this.state.body}
                  onChange={this.handleFieldChange}
                />
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="post-submit"
              onClick={this.handleSubmit}
              disabled={this.state.submitDisabled}
            >
              Submit
            </button>
          </div>
        </div>
        <i
          className="modal-dismiss-icon icon ion-close"
          onClick={this.dismiss}
        />
      </Modal>
    )
  }
}

const modalStyles = {
  content: {
    padding: '0px'
  },
  overlay: {
    backgroundColor: 'rgba(100, 100, 100, 0.75)'
  }
}

function mapStateToProps({ categories, modal }) {
  const { headerText, post: { title, author, body, category, id } } = modal
  return {
    categories,
    headerText,
    category,
    title,
    author,
    body,
    id
  }
}

export default connect(
  mapStateToProps,
  { addNewPost, updatePost, closeModal }
)(PostModal)