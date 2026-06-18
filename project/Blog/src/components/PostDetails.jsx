import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { posts } from '../data'

const PostDetails = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const post = posts.find(
    (post) => post.id === Number(postId)
  )

  if (!post) {
    return <h3>Post Not Found</h3>
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <button onClick={() => navigate('/')}>
        Go Back
      </button>
    </div>
  )
}

export default PostDetails