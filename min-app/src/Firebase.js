import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, child } from "firebase/database";
import "./Sidebar.js";

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

const merketab = [];
henteDatabaseInf("Merke");
function henteDatabaseInf(parameter) {
  const dbRef = ref(getDatabase());
  const tab = [];
  const dbPath = "/" + parameter + " navn";
  for (let i = 0; i < 27; i++) {
    // Use the onValue listener instead of the get method to receive realtime updates
    onValue(
      child(dbRef, i + dbPath),
      (snapshot) => {
        if (snapshot.exists()) {
          // Clear the tab array before adding new elements
          //tab.length = 0;
          const elBiler = [];
          // Use Object.values() to extract the values of the snapshot object as an array
          // const elBiler = Object.values(snapshot.val());
          if (!tab.includes(snapshot.val())) {
            //console.log(tab);
            // Add each element of the elBiler array to the tab array
            tab.push(snapshot.val());
          } else {
            //console.log("ELSE");
          }

          /*
        elBiler.forEach((el) => {
          tab.push(el);
          console.log(el);
          console.log(tab);
        });
        */
          //console.log(elBiler[0]);
          //console.log("test");
          // Update the menu items with the new data

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

function updateMenu(data) {
  let list = document.getElementById("liste");
  // Remove all existing menu items before adding new ones
  list.innerHTML = "";

  // Iterate over the data array and create a new <a> element for each element
  data.forEach((item) => {
    let id = "#";
    let a = document.createElement("li");
    a.className = "sideMenu";
    // Setter tesla eller skoda i URL
    if (item === "Tesla"){
      id = "Tesla"
    }else{
      id = "Skoda"
    }
    a.innerHTML = `<a href="` + id + `">` + item + `</a>`; 
    list.appendChild(a);
    a.onclick = hentUrl;
  });
}

// henter tesla eller skoda fra urlen og logger den i consolet
// skal brukes til å hente undermeny og/eller rekkevidden
async function hentUrl(){
  let modell = window.location.href;
  //modell.substring(23,27);
  console.log(modell.substring(22,27));
}

export default henteDatabaseInf;

//let tab = hentMerke();

// https://stackoverflow.com/questions/11001318/waiting-for-api-call-to-finish-in-javascript-before-continuing
// del opp i to?????? sjekk ut linken
/*
hentMerke();
function hentMerke() {
  //const merketab = [];
  const dbPath = "/Merke navn";
  let verdi = 0;
  //console.log("før for-løkka 1 ");
  for (let i = 0; i < 27; i++) {
    // bytt ut 27 med lengden på JSON fil (???? hvordan??????????)
    const referanse = ref(db, i + dbPath);
    onValue(referanse, (snapshot) => {
      //get(child(dbRef, (i + dbPath)).then((snapshot) => {
      console.log("før api");
      if (snapshot.exists()) {
        console.log("mellom exist og val");
        if (merketab.includes(snapshot.val())) {
          // Merke blir ikke lagt til hvis det allerede er i lista
          // Kanskje snu på denne if spørringa?
        } else {
          setTimeout(5000);
          merketab.push(snapshot.val()); // skal også funke, push legger til bakerst i lista
          //merketab[verdi] = (snapshot.val());
          console.log(merketab [verdi]); // skal fjernes
          //verdi++;
          console.log("etter snapshot.val");
        }
      } else {
        console.log("No data available");
      }
    });
  }
  // verdi blir UNDEFINED :(
  merketab.forEach((i) => console.log(i));
  for (let i = 0; i < 2; i++) {
    console.log(merketab[0] + "??????");
  }
  return merketab;
}*/

/*function hentTilMeny(){

    let referanse = ref(db, '/El-Biler');
    onValue(referanse, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    })
}*/

/*
henteDatabaseInf();

// Her henter vi inn el-biler fra databasen og legger de til i en tabell
// Deretter tar vi dataen i lista og lager "li"-elementer for å vise det i menyen på skjermen
function henteDatabaseInf() {
  const dbRef = ref(getDatabase());
  const tab = [];
  let test = get(child(dbRef, "El-biler"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const tab = Object.keys(snapshot.val());
        // tab.push(snapshot.val());
        console.log(tab);

        //let list = document.getElementById("liste");
        // her er det kaos
        /*
        tab.forEach((item) => {
          let a = document.createElement("a");
          //document.getElementsByName("li").className = "menu-item";
          a.className = "menu-item";
          a.innerText = item;
          list.appendChild(a);
        });

        let newLi = document.getElementById("li");
        let textnode = document.createTextNode(snapshot.val());
        newLi.appendChild(textnode);
        document.getElementById("liste").appendChild(newLi);
        console.log("TEST");
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  let nyTest = JSON.stringify(test);
  //console.log(nyTest);
  console.log(tab);
}
/*
function menyElementer() {
  let list = document.getElementById("liste");

  tab.forEach((item) => {
    let li = document.createElement("a ");
    li.innerText = item;
    list.appendChild(li);
  });
}
*/
//export default hentMerke;
//export default henteDatabaseInf;
