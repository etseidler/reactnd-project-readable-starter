import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  updateSortOrder,
  openModal,
  changeCategory
} from './actions'
import PostListSorter from './PostListSorter'
import Post from './Post'
import NotFound from './NotFound'

class PostList extends Component {
  constructor(props) {
    super(props)

    this.handleSortChange = this.handleSortChange.bind(this)
  }
  componentDidMount() {
    this.props.changeCategory(this.props.category)
  }
  componentWillReceiveProps(nextProps) {
    const newCategory = nextProps.category !== this.props.category
    if (newCategory) {
      this.props.changeCategory(nextProps.category)
      this.props.updateSortOrder('none')
    }
  }
  handleSortChange({ target: { value: sortOrder } }) {
    this.props.updateSortOrder(sortOrder)
  }
  render() {
    const { postsById, sortOrder, category, categoryIds, currentCategory } = this.props
    const mainContent = categoryIds.length > 0
      ? (
        <div className="post-list">
          <PostListSorter
            onChange={this.handleSortChange}
            sortOrder={sortOrder}
          />
          {categoryIds.map(id => <Post key={id} post={postsById[id]} />)}
        </div>
      )
      : <NotFound text="No Posts Found" hideMainPageLink={!currentCategory} />
    return (
      <div className="post-list-container">
        <i
          className="post-add-icon icon ion-plus-circled"
          onClick={() => this.props.openModal('Add New Post', { category })}
        />
        {mainContent}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    posts:
    {
      byId: postsById,
      sortOrder,
      categoryIds,
      category: currentCategory
    },
    categories,
    modal
  } = state
  return {
    postsById,
    categoryIds,
    currentCategory,
    sortOrder,
    categories,
    modal
  }
}

export default connect(
  mapStateToProps,
  { updateSortOrder, changeCategory, openModal }
)(PostList)
