import React from 'react'
import { Outlet } from 'react-router-dom'

const PostLayout = () => {
  return (
    <div>
      <h1>Post Layout</h1>
      <Outlet />
    </div>
  )
}

export default PostLayout