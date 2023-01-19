const express = require("express");
const app = express();

app.get('/,', function(req, res) {
    return res.json({
        message: "Heisann)",
        success: true
    })
});

app.post('/', function(req, res){
    return res.json({
        message: "Velkommen :>",
        success: true
    })
});

app.listen(3000, () =>
    console.log('Eksempel å lytte til port 3000'),
);


var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prosjektoppgave23-default-rtdb.europe-west1.firebasedatabase.app"
});
