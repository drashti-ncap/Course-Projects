import React from 'react'
import { posts } from '../data'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        Blog Posts
      </h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>

          <p>{post.content}</p>

          <Link to={`/posts/${post.id}`}>
            View More
          </Link>

          <hr />
        </div>
      ))}
    </div>
  )
}

export default Home