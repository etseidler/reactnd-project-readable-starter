import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeCategory, loadPostComments } from './actions'
import { getPostCommentsRequest } from './utils/api'

class PostDetail extends Component {
  componentDidMount() {
    this.props.changeCategory(this.props.post.category)
    getPostCommentsRequest(this.props.post.id).then(this.props.loadPostComments)
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
        <div className="post-detail-comments">
          <div className="comments-header">Comments</div>
          {this.props.comments.allIds.map((commentId) => {
            const {
              author: commentAuthor,
              voteScore: commentVoteScore,
              body: commentBody
            } = this.props.comments.byId[commentId]
            return (
              <div key={commentId} className="comment">
                <div className="comment-body">{commentBody}</div>
                <div className="comment-author">{commentAuthor}</div>
                <div className="comment-vote-score">{commentVoteScore}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: category => dispatch(changeCategory(category)),
    loadPostComments: comments => dispatch(loadPostComments(comments))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
