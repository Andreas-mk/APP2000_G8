import './Firebase.js';
import React from 'react';
import MapContainer from './mapContainer';
import Sidebar from './Sidebar';
import './Nobil.js';


/* Get a list of cars from your database
async function getBiler(db) {
  const carCol = collection(db, 'Usikker'); 
  const carSnapshot = await getDocs(carCol);
  const carList = carSnapshot.docs.map(doc => doc.data());
  return carList;
}
*/
function App() {
  return (

    <div className="App" id="outer-container">
      <Sidebar />
      <MapContainer />
    </div>

  );
}
export default App;