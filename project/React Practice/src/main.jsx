import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import ThemeSwitcher from './components/ThemeSwitcher';
import Form from './components/FormControls';
import FeedBackForm from './components/FeedBackForm';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ThemeSwitcher />} />
        <Route path="/form" element={<Form />} />
        <Route path="/feedback" element={<FeedBackForm />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);