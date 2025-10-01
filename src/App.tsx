import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OverviewPage from '@/components/templates/OverviewPage/OverviewPage';
import FavoritesPage from '@/components/templates/FavoritesPage/FavoritesPage';
import ContactsPage from '@/components/templates/ContactsPage/ContactsPage';
import "./index.css";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/Overview" element={<OverviewPage />} />
          <Route path="/Favorites" element={<FavoritesPage />} />
          <Route path="/ContactList" element={<ContactsPage />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
