import React from 'react'
import Home from './components/Home'
import NotFound from './components/NotFound'
import PostDetails from './components/PostDetails'
import PostLayout from './components/PostLayout'

const App = () => {
  return (
    <div>
      <Home />
      <NotFound />
      <PostDetails />
      <PostLayout />
    </div>
  )
}

export default App;
