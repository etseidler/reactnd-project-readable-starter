import React from 'react'
import { sortOrderMap } from './utils/helpers'

function PostListSorter({ onChange, sortOrder }) {
  return (
    <div className="post-list-sort-control">
      <select onChange={onChange} value={sortOrder} >
        <option value="none" disabled>Select a Sort Order</option>
        {Object.keys(sortOrderMap)
          .slice()
          .sort()
          .reverse()
          .map(sortOption => (
            <option
              key={sortOption}
              value={sortOption}
            >
              {sortOrderMap[sortOption].sortDisplayValue}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default PostListSorter