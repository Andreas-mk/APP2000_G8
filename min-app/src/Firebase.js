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
const db = getDatabase();
const tab = [];
const merketab = [];
henteDatabaseInf("Variant");
function henteDatabaseInf(parameter) {
  const dbRef = ref(getDatabase());
  const dbPath = "/" + parameter + " navn";
  for (let i = 0; i < 27; i++) {
    // Use the onValue listener instead of the get method to receive realtime updates
    onValue(
      child(dbRef, i + dbPath),
      (snapshot) => {
        if (snapshot.exists()) {
          // Clear the tab array before adding new elements
          // Use Object.values() to extract the values of the snapshot object as an array
          const elBiler = Object.values(snapshot.val());
          if (!tab.includes(snapshot.val())) {
            // Add each element of the elBiler array to the tab array
            tab.push(snapshot.val());
          } else {

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
// AMK
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

        radius = snapshot.val();
        //console.log(radius);
      } else {
        console.log("No data available");
      }
    });
}


// ??
function updateMenu(data) {
  let list = document.getElementById("liste");
  // Remove all existing menu items before adding new ones
  list.innerHTML = "";

  // Iterate over the data array and create a new <a> element for each element
  data.forEach((item) => {
    let id = "#";

    let a = document.createElement("ul");
    a.className = "item-list";
    // brukes for å sette hvilkewn bil som er trykket på i URL
    switch (item) {
      case "Long Range AWD": id = "Long Range AWD";
        break;
      case "Long Range AWD 7-s": id = "Long Range AWD 7-s";
        break;
      case "Performance AWD": id = "Performance AWD";
        break;
      case "Performance AWD 7-s": id = "Performance AWD 7-s";
        break;
      case "iV50": id = "iV50";
        break;
      case "iV60": id = "iV60";
        break;
      case "iV80": id = "iV80";
        break;
      case "iV80X": id = "iV80X";
        break;
      case "iV80 Max": id = "iV80 Max";
        break;
      case "iV80 Sportline": id = "iV80 Sportline";
        break;
      case "iV80 Ultra": id = "iV80 Ultra";
        break;
      case "iV80X Sportline": id = "iV80X Sportline";
        break;

    }

    a.innerHTML = `<a id= ` + id + ` href="#">` + item + `</a>`;

    list.appendChild(a);

    a.addEventListener("click", function (event) {

      // legger inn hvilken bil som er trykket på i URLen 
      let Url = window.location.href;
      console.log(event.target.textContent);
      window.history.pushState({ path: Url }, '', event.target.textContent);

      // Kjører ut rekkevidde
      for (let i = 0; i < tab.length; i++) {
        if (tab[i] === event.target.textContent) {
          radius = Rekkevidde(i);
        }
      }
    })
  });
}

export default henteDatabaseInf;

