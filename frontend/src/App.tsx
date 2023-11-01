import { BrowserRouter, Routes, Route } from "react-router-dom";
import Randomizer from "./components/Ramdomizer/Randomizer";
import ItemBuilder from "./components/ItemBuilder/ItemBuilder";
import Header from "./components/Header";

import React from "react";
import About from "./components/About";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Randomizer />} />
          <Route path="/build" element={<ItemBuilder />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Randomizer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
