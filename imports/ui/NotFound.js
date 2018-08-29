import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  // return <p>NotFound Component here</p>
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>Hmmm, we're unable to find that page</p>
        <Link className="button button--link" to="/">HEAD HOME</Link>
      </div>
    </div>
  )
}

export default NotFound