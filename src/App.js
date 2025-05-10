import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieGrid from './pages/MovieGrid';
import MovieDetails from './pages/MovieDetails';
import TrendingMovies from "./pages/TrendingMovies";
import Favorites from "./pages/FavoriteMovies";
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <>
      <Navbar/>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies" element={<MovieGrid />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/trending" element={<TrendingMovies />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
      <Footer/>
    </>
  );
}

export default App;
