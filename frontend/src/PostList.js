import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListSorter from './PostListSorter'
import PostListItem from './PostListItem'
import NotFound from './NotFound'

class PostList extends Component {
  constructor(props) {
    super(props)

    this.defaultSortValue = 'disabled'
    this.sortValueToSortFunction = {
      'voteScore': this.sortDescending,
      'title': this.sortAscending,
      'timestampDescending': this.sortDescending,
      'timestampAscending': this.sortAscending
    }

    this.state = {
      sortedIds: props.postIds,
      sortOrder: this.defaultSortValue
    }

    this.handleSortChange = this.handleSortChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ sortedIds: nextProps.postIds, sortOrder: this.defaultSortValue })
  }
  sortDescending(first, second) {
    return first > second ? -1 : 1
  }
  sortAscending(first, second) {
    return first < second ? -1 : 1
  }
  handleSortChange({ target: { value: sortProp }}) {
    const { postsById } = this.props
    const sortedIds = this.state.sortedIds.slice().sort((a, b) => {
      const first = postsById[a][sortProp]
      const second = postsById[b][sortProp]
      return this.sortValueToSortFunction[sortProp](first, second)
    })
    this.setState({
      sortedIds,
      sortOrder: sortProp
    })
  }
  render() {
    const { postsById } = this.props
    return (
      <div className="post-list">
        <PostListSorter
          onChange={this.handleSortChange}
          sortOrder={this.state.sortOrder}
          defaultValue={this.defaultSortValue}
        />
        {this.state.sortedIds.length > 0
          ? this.state.sortedIds.map(postId => <PostListItem key={postId} post={postsById[postId]} />)
          : <NotFound text="No Posts Found" />
        }
      </div>
    )
  }
}

function mapStateToProps({ posts: { byId: postsById } }) {
  return {
    postsById
  }
}

export default connect(
  mapStateToProps
)(PostList)
