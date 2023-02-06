import './App.css';
import './Firebase.js';


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

    <div className="App">
      <h1 className="App-header">Test</h1>
      <MapContainer />
      
    </div>
  );
}
export default App;