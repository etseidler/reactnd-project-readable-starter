import React from 'react'
import { Link } from 'react-router-dom'

function NotFound({ text, hideMainPageLink }) {
  return (
    <div className="not-found">
      <div className="not-found__main-text">{text}</div>
      {hideMainPageLink
        ? null
        : (
          <div className="not-found__return-to-main">
            <Link to="/">Return to Main Page</Link>
          </div>
        )
      }
    </div>
  )
}

export default NotFound