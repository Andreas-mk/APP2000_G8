import './App.css';
import React from 'react';
import MapContainer from './mapContainer';
import Sidebar from './Sidebar';


function App() {
  return (

    <div className="App" id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div id="page-wrap">
      <MapContainer />
      </div>
    </div>
  );
}

export default App;