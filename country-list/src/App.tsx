import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountriesList, CountryDetail } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountriesList />} />
        <Route path="/country/:name" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
