import { Children, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import './App.css'

function App() {

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
      return currentUser ? children : <Navigate to="/login"/>;
  };

  console.log(currentUser);

  return (
    <div className="app">
      <Router>
          <Routes>
            <Route path="/" exact element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/login" exact element={<Login />}/>
            <Route path="/register" exact element={<Register />} />
          </Routes>
      </Router>
    </div>
  )
}

export default App
