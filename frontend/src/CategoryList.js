import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize } from './utils/helpers'

function CategoryList(props) {
  return (
    <div className="category-list">
      {props.categories.allNames.length > 0
        ? props.categories.allNames
          .map((catName) => {
            const { name, path } = props.categories.byName[catName]
            const categoryIsSelected = props.selectedCategory === name
            return (
              <div
                key={name}
                className={`category-item ${categoryIsSelected ? ' category-item-selected' : ''}`}
              >
                <Link to={`/${path}`} >{capitalize(name)}</Link>
              </div>
            )
          })
        : null
      }
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