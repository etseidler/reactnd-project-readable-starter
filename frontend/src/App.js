import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Switch,
  Link,
  withRouter
} from 'react-router-dom'
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
    const { categories, posts, modal } = this.props
    const noCategories = categories.allNames.length === 0
    if (noCategories) {
      return null
    }
    return (
      <div>
        <div className="title-bar"><Link to="/">Readable</Link></div>
        <CategoryList categories={categories} />
        <Switch>
          <Route exact path="/"
            render={() => (
              <PostList />
            )}
          />
          <Route exact path="/:category"
            render={(props) => {
              const { match: { params: { category: urlCategoryName } } } = props
              if (!categories.allNames.includes(urlCategoryName)) {
                return <NotFound text="Category Not Found" />
              }
              return <PostList category={urlCategoryName} />
            }}
          />
          <Route exact path="/:category/:postId"
            render={(props) => {
              const { match: { params: { postId: urlPostId } } } = props
              const postNotAvailable = !posts.allIds.includes(urlPostId) ||
                posts.byId[urlPostId].deleted
              if (postNotAvailable) {
                return <NotFound text="Post Not Found" />
              }
              return <PostDetail post={posts.byId[urlPostId]} />
            }}
          />
          <Route
            render={() => (
              <NotFound text="Page Not Found" />
            )}
          />
        </Switch>
        <PostModal isOpen={modal.isOpen} />
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

export default withRouter(connect(
  mapStateToProps,
  { loadCategories, loadPosts }
)(App))
