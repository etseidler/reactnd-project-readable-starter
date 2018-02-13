import React from 'react'
import { capitalize } from './utils/string'

function CategoryList(props) {
  return (
    <div className="category-list">
      {props.categories
        .map(cat => (
          <div key={cat.name} className="category-item">{capitalize(cat.name)}</div>
        ))
      }
    </div>
  )
}

export default CategoryList