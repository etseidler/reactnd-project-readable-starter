import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from './utils/helpers'

function CategoryList(props) {
  return (
    <div className="category-list">
      {props.categories.allNames
        .map((catName) => {
          const { name, path } = props.categories.byName[catName]
          return <div key={name} className="category-item"><Link to={`/category/${path}`} >{capitalize(name)}</Link></div>
        })
      }
    </div>
  )
}

export default CategoryList