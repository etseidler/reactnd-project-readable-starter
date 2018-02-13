import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from './actions'
import { getCategories, getPosts } from './utils/api'
import { capitalize } from './utils/string'
import './App.css'

class App extends Component {
  componentDidMount() {
    getCategories().then(this.props.fetchCategories)
    getPosts().then(this.props.fetchPosts)
  }
  render() {
    if (!this.props.categories || !this.props.posts.ids) {
      return null
    }
    return (
      <div>
        <div className="title-bar">Readable</div>
        <div className="category-list">
          {this.props.categories
            .map(cat => (
              <div key={cat.name} className="category-item">{capitalize(cat.name)}</div>
            ))
          }
        </div>
        <div className="post-list">
          {this.props.posts.ids
            .map(postId => (
              <div key={postId} className="post-item">
                <div className="post-vote-score">{this.props.posts.posts[postId].voteScore.toString().padStart(5)}</div>
                <div className="post-title">{this.props.posts.posts[postId].title}</div>
                <div className="post-comment-count">{this.props.posts.posts[postId].commentCount} comment(s)</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => dispatch(fetchCategories(data)),
    fetchPosts: data => dispatch(fetchPosts(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
