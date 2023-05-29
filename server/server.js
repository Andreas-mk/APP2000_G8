// npm run dev i terminal

const express = require('express')
const app = express()
const cors = require("cors")
//const $ = require('jquery') // ble brukt tidligere, se kommentar nederst i fila
const axios = require('axios')

const nobilApiKey = "6f128b7050b466c9a661f763435dc116";

app.use(cors({
    //origin: 'https://vercel.app'
    origin: '*' // Tillater alle domener
}))


app.use(express.json()) // For å kunne parse json

// gjør dette til en funksjon -> putt i en egen nobil fil, også importer den hit?

// disse oppdateres etter museklikk på client-siden
//const lat = '59.91673'
//const long = '10.24782'
//const rekkevidde = '5000' //denne er i meter

async function nyttOmråde(lat, long, rekkevidde) {
    app.get('/api/ladestasjoner', async (req, res) => {
        try {
            const response = await axios.get('https://nobil.no/api/server/search.php', {
                params: {
                    'apikey': nobilApiKey,
                    'apiversion': '3',
                    'action': 'search',
                    'type': 'near',
                    'lat': lat,
                    'long': long,
                    'distance': rekkevidde,
                    'limit': 1000 // Hvis vi ikke har med limit får vi bare 1 ladestasjon
                }
            })
            res.json(response.data)
        } catch (error) {
            console.error('Error - ', error)
            res.status(500).json({ error: 'Feil oppstått' })
        }
    })
}

// Oppretter en route til /posisjon
app.post('/api/posisjon', (req, res) => {
    try {
        // Behandler innkommende JSON slik at det kan brukes i API-kallet til Nobils database
        // JSON objektet må deles opp i 2 stringer (lat og long)
        const klikkPosisjon = req.body.posisjon
        const lat = klikkPosisjon.lat.toString()
        console.log(lat);
        const long = klikkPosisjon.lng.toString()
        console.log(long);
        // Kaller på funksjonen som henter ladestasjoner fra Nobil med parametre fra klienten. Sender også Status 200 - OK
        // Rekkevidden burde hentes fra elbil-databasen
        nyttOmråde(lat, long, '250000').then(console.log("Ladestasjoner hentet"))
    } catch (error) {
        console.error('Error - ', error)
        res.status(500).json({ error: 'Feil oppstått' })
    }

});

//app.listen(5000, () => { console.log("Server startet på port 5000") })



/*
--- JSONP kall for cross-domain API kall uten server ---
$.ajax({
    url: 'https://nobil.no/api/server/search.php',
    data: {
        'apikey': nobilApiKey,
        'apiversion': '3',
        'action': "search",
        'type': 'near',
        'lat': lat,
        'long': long,
        'distance': rekkevidde,
        'limit': 1000
    },
    success: parseJsonResponse,
    dataType: 'jsonp'
});

*/

// Struktur for å hente alt fra firebase
/*
const merkeTab = hentFraFirebase('Merke navn'); // dbPath blir parameter
const modellTab = hentFraFirebase('Modell navn');
const variantTab = hentFraFirebase('Variant navn'); 
const rekkeviddeTab = hentFraFirebase('WLTP Rekkevidde'); 
*/

