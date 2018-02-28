import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeCategory } from './actions'

class PostDetail extends Component {
  componentDidMount() {
    this.props.changeCategory(this.props.post.category)
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
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: category => dispatch(changeCategory(category))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PostDetail)
