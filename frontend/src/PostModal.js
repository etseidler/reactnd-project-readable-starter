/* globals document */
/* eslint no-use-before-define: "off" */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import uuid from 'uuid/v4'
import { addNewPost } from './actions'
import { createNewPost } from './utils/api'
import { capitalize } from './utils/helpers'

class PostModal extends Component {
  constructor(props) {
    super(props)
    const firstCategoryName = props.categories.allNames[0]

    this.state = {
      isOpen: props.isOpen,
      title: '',
      author: '',
      category: props.category || firstCategoryName,
      firstCategoryName,
      body: '',
      submitDisabled: true
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleDismiss = this.handleDismiss.bind(this)
    this.resetFormState = this.resetFormState.bind(this)
    this.validateFormFields = this.validateFormFields.bind(this)
    this.submitNewPost = this.submitNewPost.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.state.category) {
      this.setState({ category: nextProps.category || this.state.firstCategoryName })
    }
  }
  validateFormFields() {
    const fieldsToValidate = ['title', 'author', 'body']
    let submitDisabled = false
    fieldsToValidate.forEach((field) => {
      if (this.state[field].length === 0) {
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
  handleDismiss() {
    this.resetFormState()
    this.props.onDismiss()
  }
  resetFormState() {
    this.setState({
      title: '',
      author: '',
      body: '',
    })
  }
  submitNewPost() {
    const { title, author, category, body } = this.state
    const newPostData = {
      timestamp: Date.now(),
      id: uuid(),
      title,
      author,
      category,
      body
    }
    createNewPost(newPostData)
      .then((post) => {
        this.props.addNewPost(post)
        this.resetFormState()
        this.props.afterSubmit(post)
      })
  }
  render() {
    return (
      <Modal
        appElement={document.getElementById('root')}
        isOpen={this.props.isOpen}
        style={modalStyles}
      >
        <div className="modal-container">
          <div className="modal-header">{this.props.modalTitleText}</div>
          <div className="modal-body">
            <div className="new-post-form">
              <label htmlFor="new-post-title">
                Title
                <br />
                <input
                  name="title"
                  value={this.state.title}
                  onChange={this.handleFieldChange}
                  id="new-post-title"
                />
              </label>
              <label htmlFor="new-post-author">
                Author
                <br />
                <input
                  name="author"
                  id="new-post-author"
                  value={this.state.author}
                  onChange={this.handleFieldChange}
                />
              </label>
              <label htmlFor="new-post-body">
                Category
                <br />
                <select
                  name="category"
                  id="new-post-category"
                  value={this.state.category}
                  onChange={this.handleFieldChange}
                >
                  {this.props.categories.allNames
                    .map(categoryName => (
                      <option key={categoryName} value={categoryName}>
                        {capitalize(categoryName)}
                      </option>
                    ))
                  }
                </select>
              </label>
              <label htmlFor="new-post-body">
                Post
                <br />
                <textarea
                  name="body"
                  id="new-post-body"
                  value={this.state.body}
                  onChange={this.handleFieldChange}
                />
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="new-post-submit"
              onClick={this.submitNewPost}
              disabled={this.state.submitDisabled}
            >
              Submit
            </button>
          </div>
        </div>
        <i
          className="modal-dismiss-icon icon ion-close"
          onClick={this.handleDismiss}
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

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPost: post => dispatch(addNewPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostModal)