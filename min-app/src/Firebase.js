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
function henteDatabaseInf() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, "El-biler/Bmw/I3/Rekkevidde"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
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
}

export default henteDatabaseInf;
