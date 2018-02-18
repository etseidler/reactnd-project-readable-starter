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
      sortedIds: props.postIds,
      category: props.category
    }

    this.handleSortChange = this.handleSortChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      const sortedIds = sortPostIds(nextProps.postIds, this.props.postsById, this.props.sortOrder)
      this.setState({ sortedIds })
    }
  }
  handleSortChange({ target: { value: sortOrder }}) {
    this.props.updateSortOrder(sortOrder)
    const sortedIds = sortPostIds(
      this.state.sortedIds.slice(),
      this.props.postsById,
      sortOrder
    )
    this.setState({ sortedIds })
  }
  render() {
    const { postsById, sortOrder } = this.props
    return (
      <div className="post-list">
        <PostListSorter
          onChange={this.handleSortChange}
          sortOrder={sortOrder}
        />
        {this.state.sortedIds.length > 0
          ? this.state.sortedIds.map(postId => <Post key={postId} post={postsById[postId]} />)
          : <NotFound text="No Posts Found" />
        }
      </div>
    )
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
