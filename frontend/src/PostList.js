/* globals document */
/* eslint no-use-before-define: "off" */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { updateSortOrder } from './actions'
import { sortPostIds } from './utils/helpers'
import PostListSorter from './PostListSorter'
import Post from './Post'
import NotFound from './NotFound'

class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postIds: props.postIds,
      addPostModalOpen: false
    }

    this.handleSortChange = this.handleSortChange.bind(this)
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
                  <input name="title" id="new-post-title" />
                </label>
                <label htmlFor="new-post-author">
                  Author
                  <br />
                  <input name="author" id="new-post-author" />
                </label>
                <label htmlFor="new-post-body">
                  Category
                  <br />
                  <select name="category" id="new-post-category">
                    <option value="react">React</option>
                    <option value="redux">Redux</option>
                    <option value="udacity">Udacity</option>
                  </select>
                </label>
                <label htmlFor="new-post-body">
                  Post
                  <br />
                  <textarea name="body" id="new-post-body" />
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <div className="new-post-submit">Submit</div>
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

function mapStateToProps({ posts: { byId: postsById, sortOrder } }) {
  return {
    postsById,
    sortOrder
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSortOrder: sortOrder => dispatch(updateSortOrder(sortOrder))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
