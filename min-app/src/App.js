import './Firebase.js';
import React, { useEffect, useState } from 'react';
import KartKlikk, { tegnStasjonsMarkører } from './KartKlikk';
import Sidebar from './Sidebar';

function App() {

  // Her blir sidemenyen og kartkomponentene lagt til i appen
  // Elias og Thomas
  return (
    <div className="App" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <KartKlikk />
    </div>

  );
}

export default App;