import React from 'react';
import './App.css';
import Gallery from "./components/Gallery";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Details from "./components/Details";
import Episode from "./components/Episode";

function App() {
  return (

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="/details/:charId" element={<Details />} />
              <Route path="/episode/:episodeId" element={<Episode />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
