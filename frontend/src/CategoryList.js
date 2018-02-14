import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from './utils/helpers'

function CategoryList(props) {
  return (
    <div className="category-list">
      {props.categories
        .map(cat => (
          <div key={cat.name} className="category-item"><Link to={`/category/${cat.path}`} >{capitalize(cat.name)}</Link></div>
        ))
      }
    </div>
  )
}

export default CategoryList