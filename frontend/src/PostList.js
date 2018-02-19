import React, { Component } from 'react'
import { connect } from 'react-redux'
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
      category: props.category
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
  handleSortChange({ target: { value: sortOrder }}) {
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
    return this.state.postIds.length > 0
      ? <div className="post-list">
          <PostListSorter
            onChange={this.handleSortChange}
            sortOrder={sortOrder}
          />
          {this.state.postIds.map(postId => <Post key={postId} post={postsById[postId]} />)}
        </div>
      : <NotFound text="No Posts Found" />
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
