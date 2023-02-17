import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from "firebase/database";

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

/*function hentTilMeny(){

    let referanse = ref(db, '/El-Biler');
    onValue(referanse, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    })
}*/
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

        let list = document.getElementById("liste");
        // her er det kaos
        /*
        tab.forEach((item) => {
          let a = document.createElement("a");
          //document.getElementsByName("li").className = "menu-item";
          a.className = "menu-item";
          a.innerText = item;
          list.appendChild(a);
        });
*/
        //let newLi = document.getElementById("li");
        //let textnode = document.createTextNode(snapshot.val());
        //newLi.appendChild(textnode);
        //document.getElementById("liste2").appendChild(newLi);
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

export default henteDatabaseInf;
