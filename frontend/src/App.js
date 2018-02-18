import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { fetchCategories, fetchPosts } from './actions'
import { getCategories, getPosts } from './utils/api'
import CategoryList from './CategoryList'
import NotFound from './NotFound'
import PostList from './PostList'
import './App.css'

class App extends Component {
  componentDidMount() {
    getCategories().then(this.props.fetchCategories)
    getPosts().then(this.props.fetchPosts)
  }
  getIdsOfPostsInCategory(categoryName) {
    return Object.keys(this.props.posts.byId)
      .filter((postKey) => {
        return this.props.posts.byId[postKey].category === categoryName
      })
  }
  render() {
    const noCategories = this.props.categories.allNames.length === 0
    const noIds = this.props.posts.allIds.length === 0
    if (noCategories || noIds) {
      return null
    }
    return (
      <div>
        <div className="title-bar"><Link to="/">Readable</Link></div>
        <CategoryList categories={this.props.categories} />
        <Switch>
            <Route exact path='/'
              render={() => (
                <PostList postIds={this.props.posts.allIds} />
              )}
            />
            <Route exact path='/category/:name'
              render={props => {
                const { match: { params: { name: urlCategoryName } } } = props
                if (!this.props.categories.allNames.includes(urlCategoryName)) {
                  return <NotFound text="Category Not Found" />
                }
                return <PostList postIds={this.getIdsOfPostsInCategory(urlCategoryName)} />
              }}
            />
            <Route
              render={() => (
                <NotFound text='Page Not Found' />
              )}
            />
        </Switch>
      </div>
    )
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
