import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { fetchCategories, fetchPosts } from './actions'
import { getCategories, getPosts } from './utils/api'
import CategoryList from './CategoryList'
import PostList from './PostList'
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
        <div className="title-bar"><Link to="/">Readable</Link></div>
        <CategoryList categories={this.props.categories} />
        <Switch>
            <Route exact path='/'
              render={() => (
                <PostList posts={this.props.posts} />
              )}
            />
        </Switch>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
