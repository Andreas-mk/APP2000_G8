import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, child, get } from "firebase/database";
import "./Sidebar.js";
import { data, event } from "jquery";

const firebaseConfig = {
  apiKey: "AIzaSyBUkxpITh4XGVD573zVXnQVRPUwJ25b89k",
  authDomain: "prosjektoppgave23.firebaseapp.com",
  databaseURL:
    "https://prosjektoppgave23-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prosjektoppgave23",
  storageBucket: "prosjektoppgave23.appspot.com",
  messagingSenderId: "593962167470",
  appId: "1:593962167470:web:36005107b44911dcf9513f",
  measurementId: "G-S5KC45PN36",
};

const app = initializeApp(firebaseConfig);
//firebaseConfig.initializeApp(firebaseConfig)
const db = getDatabase();
const tab = [];
const merketab = [];
henteDatabaseInf("Variant");
function henteDatabaseInf(parameter) {
  const dbRef = ref(getDatabase());
  //const tab = [];
  const dbPath = "/" + parameter + " navn";
  for (let i = 0; i < 27; i++) {
    // Use the onValue listener instead of the get method to receive realtime updates
    onValue(
      child(dbRef, i + dbPath),
      (snapshot) => {
        if (snapshot.exists()) {
          // Clear the tab array before adding new elements
          //tab.length = 0;
          //const elBiler = [];
          // Use Object.values() to extract the values of the snapshot object as an array
          const elBiler = Object.values(snapshot.val());
          if (!tab.includes(snapshot.val())) {
            //console.log(tab);
            // Add each element of the elBiler array to the tab array
            tab.push(snapshot.val());
          } else {
            //console.log("ELSE");
          }


          // kaller på metoden for å legge bilene inn i menyen
          updateMenu(tab);
        } else {
          console.log("No data available");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

// Henter ut radusien til en bil fra databasen
export let radius = 30;
export function Rekkevidde(variant) {
  let dbstien = '/WLTP Rekkevidde'
  const dbRef = ref(getDatabase());
  const db = getDatabase();
  onValue(
    child(dbRef, variant + dbstien),
    (snapshot) => {
      if (snapshot.exists()) {
        // Clear the tab array before adding new elements

        // Use Object.values() to extract the values of the snapshot object as an array
        const data = Object.values(snapshot.val());

        //console.log(snapshot.val());
        radius = snapshot.val();
        //console.log(radius);
      } else {
        console.log("No data available");
      }
    });
}


//const knappTab = []; -- tenkte å lagre <a> i en liste for å bruke dem
function updateMenu(data) {
  let list = document.getElementById("liste");
  // Remove all existing menu items before adding new ones
  list.innerHTML = "";

  // Iterate over the data array and create a new <a> element for each element
  data.forEach((item) => {
    let id = "#";

    let a = document.createElement("ul");
    a.className = "item-list";
    // Setter tesla eller skoda i URL
    if (item === "Tesla") {
      id = "Tesla"
    } else {
      id = "Skoda"
    }
    //a.innerHTML = `<a id= ` + id + ` href="` + id + `">` + item + `</a>`;
    a.innerHTML = `<a id= ` + id + ` href="#">` + item + `</a>`;

    list.appendChild(a);

    //console.log(knappTab);

    // denne funker men er problemer med hva den skal gjøre 
    a.addEventListener("click", function (event) {
      //event.preventDefault();
      let nyUrl = window.location.href;
      console.log(event.target.textContent);
      window.history.replaceState(null, null,)

      // Kjører ut rekkevidde
      for (let i = 0; i < tab.length; i++) {
        if (tab[i] === event.target.textContent) {
          radius = Rekkevidde(i);
        }
      }



    })
    //console.log(radius);
  });
}

// henter tesla eller skoda fra urlen og logger den i consolet
// skal brukes til å hente undermeny og/eller rekkevidden
export async function hentUrl() {
  let modell = window.location.href;
  //  må endres til vercel linken senere 
  let sistedel = modell.split('http://localhost:3000/')[1];
  console.log(sistedel);

  return sistedel;
}

function hentRekkevidde(urlData) {
  // en moetode som henter rekkevidden til en spesifik bil
  henteDatabaseInf("Modell");

}

export default henteDatabaseInf;
//export default hentMerke;
//export default henteDatabaseInf;
