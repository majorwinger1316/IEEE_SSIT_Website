import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import './App.css';
import Submission from './pages/Submission';

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const AuthenticatedLayout = ({ children }) => (
    <>
      <Navbar />
      {children}
    </>
  );

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<RequireAuth><AuthenticatedLayout><Home /></AuthenticatedLayout></RequireAuth>} />
          <Route path="/about" element={<RequireAuth><AuthenticatedLayout><About /></AuthenticatedLayout></RequireAuth>} />
          <Route path="/submission" element={<RequireAuth><AuthenticatedLayout><Submission /></AuthenticatedLayout></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
