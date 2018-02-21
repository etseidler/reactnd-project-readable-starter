/* globals document */
/* eslint no-use-before-define: "off" */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import uuid from 'uuid/v4'
import { updateSortOrder, addNewPost } from './actions'
import { sortPostIds } from './utils/helpers'
import { createNewPost } from './utils/api'
import PostListSorter from './PostListSorter'
import Post from './Post'
import NotFound from './NotFound'

class PostList extends Component {
  constructor(props) {
    super(props)
    const firstCategoryName = props.categories.allNames[0]

    this.state = {
      postIds: props.postIds,
      addPostModalOpen: false,
      title: '',
      author: '',
      category: firstCategoryName,
      firstCategoryName,
      body: '',
      submitDisabled: true
    }

    this.handleSortChange = this.handleSortChange.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.validateFormFields = this.validateFormFields.bind(this)
    this.submitNewPost = this.submitNewPost.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      if (this.props.sortOrder !== 'none') {
        const sortedIds = sortPostIds(nextProps.postIds, this.props.postsById, this.props.sortOrder)
        this.setState({ postIds: sortedIds })
      }
      else {
        this.setState({ postIds: nextProps.postIds })
      }
    }
  }
  handleSortChange({ target: { value: sortOrder } }) {
    this.props.updateSortOrder(sortOrder)
    const sortedIds = sortPostIds(
      this.state.postIds,
      this.props.postsById,
      sortOrder
    )
    this.setState({ postIds: sortedIds })
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
        this.setState({
          addPostModalOpen: false,
          title: '',
          author: '',
          category: this.state.firstCategoryName,
          body: '',
          postIds: [...this.state.postIds, post.id]
        })
      })
  }
  render() {
    const { postsById, sortOrder } = this.props
    const mainContent = this.state.postIds.length > 0
      ? (
        <div className="post-list">
          <PostListSorter
            onChange={this.handleSortChange}
            sortOrder={sortOrder}
          />
          {this.state.postIds.map(postId => <Post key={postId} post={postsById[postId]} />)}
        </div>
      )
      : <NotFound text="No Posts Found" />
    return (
      <div className="post-list-container">
        <i
          className="post-add-icon icon ion-plus-circled"
          onClick={() => this.setState({ addPostModalOpen: true })}
        />
        {mainContent}
        <Modal
          appElement={document.getElementById('root')}
          isOpen={this.state.addPostModalOpen}
          style={modalStyles}
        >
          <div className="modal-container">
            <div className="modal-header">Add New Post</div>
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
                    <option value="react">React</option>
                    <option value="redux">Redux</option>
                    <option value="udacity">Udacity</option>
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
            onClick={() => this.setState({ addPostModalOpen: false })}
          />
        </Modal>
      </div>
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

function mapStateToProps({ posts: { byId: postsById, sortOrder }, categories }) {
  return {
    postsById,
    sortOrder,
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSortOrder: sortOrder => dispatch(updateSortOrder(sortOrder)),
    addNewPost: post => dispatch(addNewPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
