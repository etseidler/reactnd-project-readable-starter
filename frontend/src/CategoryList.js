import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize } from './utils/helpers'

function CategoryList({ categories: { allNames, byName }, selectedCategory }) {
  return (
    <div className="category-list">
      {allNames.map((catName) => {
        const { name, path } = byName[catName]
        const categoryIsSelected = selectedCategory === name
        return (
          <div
            key={name}
            className={`category-item ${categoryIsSelected ? ' category-item-selected' : ''}`}
          >
            <Link to={`/${path}`}>{capitalize(name)}</Link>
          </div>
        )
      })}
    </div>
  )
}

function mapStateToProps({ posts: { category: selectedCategory } }) {
  return {
    selectedCategory
  }
}

export default connect(
  mapStateToProps,
  null
)(CategoryList)