import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/organisms/Navbar/navbar';
import ContactForm from '@/components/organisms/ContactForm/ContactForm';
import OverviewPage from '@/components/templates/OverviewPage/OverviewPage';
import FavoritesPage from '@/components/templates/FavoritesPage/FavoritesPage';
import ContactsPage from '@/components/templates/ContactsPage/ContactsPage';
import "./index.css";

function App() {
   const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className='App'>
      <Router>
        <Navbar onNewClick={toggleForm} />
        {showForm && <ContactForm />}
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
