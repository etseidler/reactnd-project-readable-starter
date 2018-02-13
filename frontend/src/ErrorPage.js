import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className="page-not-found">
      <div className="page-not-found__main-text">Page not Found</div>
      <div className="page-not-found__return-to-main">
        <Link to='/'>Return to Main Page</Link>
      </div>
    </div>
  )
}

export default ErrorPage