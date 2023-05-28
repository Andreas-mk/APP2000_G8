import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import hentUrl from './Firebase.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);


// prøver å flytte noen funksjoner for å se om det er bedre.
// Denne kjører nå så må bare kode at den gjør det den skal
const knapp = document.getElementById("item-list");
export function hentRekkevidde(){
  console.log("rekkkevidde funksjon funker");
  // en moetode som henter rekkevidden til en spesifik bil
  const bil = hentUrl();
  
  if(bil === "Tesla"){
    console.log("Dette blir en bra dag!!!");

     
  }

}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


