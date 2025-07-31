import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Movies from './Components/Movies/Movies';
import Actors from './Components/Actors/Actors';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile'; 
import Director from './Components/Director/Director'; 
import Reviewmovie from './Components/Reviewmovie';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Actors" element={<Actors />} />
        <Route path="/Login/:id" element={<div>Login page</div>} />
        <Route path="/profile" element={<Profile />} /> {/* Профиль работает */}
        <Route path="/Director" element={<Director />} /> {/* Режиссер работает */}
        <Route path="/Reviewmovie" element={<Reviewmovie />} /> {/* Рецензия работает */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
