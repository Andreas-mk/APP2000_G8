const express = require('express');
const app = express();

app.get('/api/my-endpoint', (req, res) => {
    // Handle the incoming request here
    res.json({ message: 'JSON object her' });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// Struktur for å hente alt fra firebase
/*
const merkeTab = hentFraFirebase('Merke navn'); // dbPath blir parameter
const modellTab = hentFraFirebase('Modell navn');
const variantTab = hentFraFirebase('Variant navn'); // ikke unik
const rekkeviddeTab = hentFraFirebase('WLTP Rekkevidde'); // key value med variant??
*/
// bruk Map - https://stackoverflow.com/questions/1144705/best-way-to-store-a-key-value-array-in-javascript
