import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from "./pages/Login";
import CreatePlot  from "./pages/CreatePlot";
import ShowAllPlots from "./pages/ShowAllPlots";
import Home from './pages/Home';
import PlotDetails from './pages/PlotDetails';
import Dashboard from "./components/Dashboard";
import UpdatePlot from './components/UpdatePlot';
import BookingConfirmation from './pages/BookingConfirmation';
import RecentProperty from "./pages/RecentProperty";

function App() {
  return (
    
    <>
      <Navbar />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home/>} />
        <Route path="/recent" element={<RecentProperty/>} />
        <Route path="/toprated" element={<h1>Top rated plots Page</h1>} />
        <Route path="/createPlot" element={<CreatePlot/>} />
        <Route path="/showAllPlots" element={<ShowAllPlots/>} />
        <Route path="/plot/:id"  element={<PlotDetails/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard/:id" element={<Dashboard/>} />
        <Route path="/update/:id" element={<UpdatePlot/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/confirmation" element={<BookingConfirmation />} />
      </Routes>
      </>
  );
}

export default App;
