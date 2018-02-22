import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSortOrder } from './actions'
import { sortPostIds } from './utils/helpers'
import PostListSorter from './PostListSorter'
import Post from './Post'
import PostModal from './PostModal'
import NotFound from './NotFound'

class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postIds: props.postIds,
      addPostModalOpen: false
    }

    this.handleSortChange = this.handleSortChange.bind(this)
    this.afterPostSubmit = this.afterPostSubmit.bind(this)
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
  afterPostSubmit(newPost) {
    const addNewPostToList = newPost.category === this.props.category ||
      !this.props.category
    if (addNewPostToList) {
      this.setState({ postIds: [...this.state.postIds, newPost.id] })
    }
    this.setState({ addPostModalOpen: false })
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
          {this.state.postIds
            .map(postId => (
              <Post
                key={postId}
                post={postsById[postId]}
              />
            ))
          }
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
        <PostModal
          modalTitleText="Add New Post"
          category={this.props.category}
          isOpen={this.state.addPostModalOpen}
          onDismiss={() => this.setState({ addPostModalOpen: false })}
          afterSubmit={this.afterPostSubmit}
        />
      </div>
    )
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
    updateSortOrder: sortOrder => dispatch(updateSortOrder(sortOrder))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
