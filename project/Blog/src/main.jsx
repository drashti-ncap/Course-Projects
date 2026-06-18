import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import Home from './components/Home'
import PostLayout from './components/PostLayout'
import PostDetails from './components/PostDetails'
import NotFound from './components/NotFound'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="posts" element={<PostLayout />}>
          <Route path=":postId" element={<PostDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
)