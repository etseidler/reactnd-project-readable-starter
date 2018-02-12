import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from './actions'
import { getCategories, getPosts } from './utils/api'
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
        <div>Categories</div>
        {this.props.categories
          .map(cat => (
            <div>{cat.name}</div>
          ))
        }
        <br />
        <div>Posts</div>
        {this.props.posts.ids
          .map(postId => (
            <div>{this.props.posts.posts[postId].title}</div>
          ))
        }
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
