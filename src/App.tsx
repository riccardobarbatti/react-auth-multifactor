import React from 'react';
//import { Auth }  from './components/auth/auth.component';
import './App.css';
import Login from "./components/login";
import Register from "./components/register";
import Nav from "./components/nav";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import About from "./pages/about";
import Home from "./pages/home";
import ErrorPage from "./pages/error404";
import Forgot from "./components/forgot";
import Reset from "./components/reset";

function App() {
  return <BrowserRouter>
      <Nav />
       <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/reset/:token" element={<Reset />} />
              <Route path="*" element={<ErrorPage />} />
       </Routes>
    </BrowserRouter>;
}

export default App;
