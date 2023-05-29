import './Firebase.js';
import React, { useEffect, useState } from 'react';
import KartKlikk, { tegnStasjonsMarkører } from './KartKlikk';
import MapContainer from './mapContainer';
import Sidebar from './Sidebar';
//import '../../server/Nobil.js';


/* Get a list of cars from your database
async function getBiler(db) {
  const carCol = collection(db, 'Usikker'); 
  const carSnapshot = await getDocs(carCol);
  const carList = carSnapshot.docs.map(doc => doc.data());
  return carList;
}
*/
function App() {
  const [backendData] = useState([{}])
  // legg inn i liste -> lag en markør for hver i i lista
  useEffect(() => {
    fetch('http://localhost:5000').then(
      response => response.json()
    ).then(
      data => {
        //console.log(data)
        // Henter posisjonene til alle ladestasjoner innenfor rekkevidden, legger de til i en liste som skal brukes til å lage markører på kartet
        const ladestasjonPos = []
        const ladestasjonNavn = []
        for (let i = 0; i < data.chargerstations.length; i++) {
          ladestasjonPos.push(data.chargerstations[i].csmd.Position)
          ladestasjonNavn.push(data.chargerstations[i].csmd.Street)
        }

        //tegnStasjonsMarkører(ladestasjonPos, ladestasjonNavn)

      }
    )
  }, [])

  return (
    <div className="App" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <MapContainer />
    </div>

  );
}



export default App;