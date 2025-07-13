import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

// 🌐 Pages publiques
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Sing from './Pages/Sing'; // Rename to Signup if needed
import Reset from './Pages/Reset';
import ForgotPassword from './Pages/ForgotPassword';
import ProgramPage from './Pages/ProgramPage';
import RecommendationPage from './Pages/RecommendationPage';
import ProfilePage from './Pages/ProfilePage'; // ✅ Ajout du profil

// 🧑‍💼 Admin
import AdminDashboard from './adminpage/admindashboard';
import ListeUsers from './adminpage/ListeUsers';
import UserChart from './adminpage/UserChart';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="App">
          <Routes>
            {/* 🌐 Pages publiques */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sing" element={<Sing />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/blog" element={<ProgramPage />} />
            <Route path="/recommendation" element={<RecommendationPage />} />
            <Route path="/profile" element={<ProfilePage />} /> {/* ✅ Ajout du profil */}

            {/* 🧑‍💼 Admin */}
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ListeUsers />} />
            <Route path="/admin/chart" element={<UserChart />} />
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;
