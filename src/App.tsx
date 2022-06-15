import React from 'react';
import './App.css';
import Gallery from "./components/Gallery";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Details from "./components/Details";

function App() {
  return (

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="/details/:charId" element={<Details />} />
          </Routes>
      </BrowserRouter>
    // <div className="App">
    //   <Gallery />
    // </div>
  );
}

export default App;
