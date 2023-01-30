import './App.css';
import React from 'react';
import MapContainer from './mapContainer';

function App() {
  return (

    <div className="App">
      <h1 className="App-header">Test</h1>
      <MapContainer />
      
    </div>
  );
}

import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUkxpITh4XGVD573zVXnQVRPUwJ25b89k",
  authDomain: "prosjektoppgave23.firebaseapp.com",
  databaseURL: "https://prosjektoppgave23-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prosjektoppgave23",
  storageBucket: "prosjektoppgave23.appspot.com",
  messagingSenderId: "593962167470",
  appId: "1:593962167470:web:36005107b44911dcf9513f",
  measurementId: "G-S5KC45PN36"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getBiler(db) {
  const carCol = collection(db, 'Biler');
  const carSnapshot = await getDocs(carCol);
  const carList = carSnapshot.docs.map(doc => doc.data());
  return carList;
}

export default App;