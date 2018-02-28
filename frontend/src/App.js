import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { loadCategories, loadPosts } from './actions'
import { getCategoriesRequest, getPostsRequest } from './utils/api'
import PostModal from './PostModal'
import CategoryList from './CategoryList'
import NotFound from './NotFound'
import PostList from './PostList'
import PostDetail from './PostDetail'
import './App.css'

class App extends Component {
  componentDidMount() {
    getCategoriesRequest().then(this.props.loadCategories)
    getPostsRequest().then(this.props.loadPosts)
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
          <Route exact path="/"
            render={() => (
              <PostList />
            )}
          />
          <Route exact path="/:category"
            render={(props) => {
              const { match: { params: { category: urlCategoryName } } } = props
              if (!this.props.categories.allNames.includes(urlCategoryName)) {
                return <NotFound text="Category Not Found" />
              }
              return <PostList category={urlCategoryName} />
            }}
          />
          <Route exact path="/:category/:postId"
            render={(props) => {
              const { match: { params: { postId: urlPostId } } } = props
              const postNotAvailable = !this.props.posts.allIds.includes(urlPostId) ||
                this.props.posts.byId[urlPostId].deleted
              if (postNotAvailable) {
                return <NotFound text="Post Not Found" />
              }
              return <PostDetail post={this.props.posts.byId[urlPostId]} />
            }}
          />
          <Route
            render={() => (
              <NotFound text="Page Not Found" />
            )}
          />
        </Switch>
        <PostModal isOpen={this.props.modal.isOpen} />
      </div>
    )
  }
}

function mapStateToProps({ categories, posts, modal }) {
  return {
    categories,
    posts,
    modal
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: data => dispatch(loadCategories(data)),
    loadPosts: data => dispatch(loadPosts(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
