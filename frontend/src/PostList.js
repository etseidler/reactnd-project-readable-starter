import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListSorter from './PostListSorter'
import NotFound from './NotFound'

class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sortedIds: this.props.postIds,
      sortOrder: 'disabled'
    }

    this.sortValueToSortFunction = {
      'voteScore': this.sortDescending,
      'title': this.sortAscending,
      'timestampDescending': this.sortDescending,
      'timestampAscending': this.sortAscending
    }

    this.handleSortChange = this.handleSortChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ sortedIds: nextProps.postIds, sortOrder: 'disabled' })
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
          defaultValue='disabled'
        />
        {this.state.sortedIds.length > 0
          ? this.state.sortedIds.map((postId) => {
            const { voteScore, title, commentCount } = postsById[postId]
            return (
              <div key={postId} className="post-item">
                <div className="post-vote-score">{voteScore.toString().padStart(5)}</div>
                <div className="post-title">{title}</div>
                <div className="post-comment-count">{commentCount} comment(s)</div>
              </div>
            )
          })
          :
          <NotFound text="No Posts Found" />
        }
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    postsById: posts.byId
  }
}

export default connect(
  mapStateToProps
)(PostList)
