/* For å få frem kart komponenter har vi brukt disse kildene
    https://developers.google.com/maps/documentation/javascript/adding-a-google-map
    https://developers.google.com/maps/documentation/javascript/examples/circle-simple */
import React, { useState, useEffect } from "react";
import { radius } from "./Firebase";
import axios from 'axios';

// Funksjon for å opretting av kartet, marker og sirkel
// Thomas med hjelp fra resten av gruppa
function KartKlikk() {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [circle, setCircle] = useState(null);

    const klikkKartFunk = (event) => {
        if (map) {
            if (circle) {
                circle.setMap(null); // Fjern tidligere sirkel fra kartet
            }
            if (marker) {
                marker.setMap(null); // Fjern tidligere markør fra kartet
            }
            const nyMarker = new window.google.maps.Marker({
                position: event.latLng,
                map: map,
                title: "Start posisjon",
            });
            const nySirkel = new window.google.maps.Circle({
                strokeColor: "#23bd29",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#b2ec73",
                fillOpacity: 0.1,
                map: map,
                center: event.latLng,
                radius: parseInt(radius) * 500, // Elbilenes rekkevidde er oppgitt i km i database, mens radius på kartet er meter, men da blir sirkelen kjempestor
            });

            setMarker(nyMarker);
            setCircle(nySirkel);

            // Her sender vi posisjon og rekkevidde, slik at brukeren får ladestasjoner rundt der hen klikket på kartet
            // Kodet av Jesper Kraft
            const latLong = event.latLng
            console.log('Sender ' + latLong + ' og rekkevidde ' + radius + ' til Express server')
            // http://app-2000-g8.vercel.app/api/posisjon // Tiltenkt sti på vercel (nettsiden)
            axios.post('http://localhost:5000/posisjon', { posisjon: latLong, rekkevidde: radius + '000' })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })




            // Markørene dukket aldri opp på kartet når koden under var i en egen funksjon
            // Henter data fra tjener med Fetch (tjeneren inneholder API-kall til Nobil.no sin server med ladestasjoner)
            // Kodet av Jesper Kraft
            // http://app-2000-g8.vercel.app/api/ladestasjoner
            fetch('http://localhost:5000/ladestasjoner').then(
                response => response.json()
            ).then(
                data => {
                    // Henter posisjonene til alle ladestasjoner innenfor rekkevidden, legger de til i en liste som brukes til å lage markører på kartet
                    const ladestasjonPos = []
                    const ladestasjonNavn = []
                    const ladeMarkører = [] // For å kunne fjerne markører
                    //console.log(data)
                    if (data.chargerstations == null) {
                        console.log('Ingen ladestasjoner funnet!')
                    } else {
                        for (let i = 0; i < data.chargerstations.length; i++) {
                            ladestasjonNavn.push(data.chargerstations[i].csmd.Street)
                            // Posisjonen må behandles. Vi får en string, men må gjøre det om til to desimaltall i et objekt
                            const posisjon = data.chargerstations[i].csmd.Position;
                            const floats = posisjon.slice(1, -1).split(",");
                            const lat = parseFloat(floats[0]);
                            const long = parseFloat(floats[1]);
                            ladestasjonPos.push({ lat: lat, lng: long })

                            const ladeMarkør = new window.google.maps.Marker({
                                map: map,
                                position: ladestasjonPos[i],
                                title: data.chargerstations[i].csmd.Street,
                                icon: {
                                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // Ladestasjonene er blå ikoner
                                }
                            })
                            ladeMarkører.push(ladeMarkør)
                        }
                    }
                }
            )
        }
    };



    useEffect(() => {
        const lastKart = () => {
            const startKart = new window.google.maps.Map(document.getElementById("map"), {
                mapId: "c09c675c2a08801a",
                zoom: 10,
                center: { lat: 59.4121414, lng: 9.0366312 },
                disableDefaultUI: true,
            });

            setMap(startKart);
        };

        lastKart();
    }, []);


    useEffect(() => {
        let lyttPaaKlikk;
        if (map) {
            lyttPaaKlikk = map.addListener("click", klikkKartFunk);
        }

        return () => {
            if (lyttPaaKlikk) {
                lyttPaaKlikk.remove();
            }

            if (circle) {
                circle.setMap(null); // Fjern sirkelen når komponenten avsluttes
            }

            if (marker) {
                marker.setMap(null); // Fjern markøren når komponenten avsluttes
            }
        };
    }, [map, circle, marker]);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <div id="map" style={{ height: "100%" }} />
        </div>
    );
}

export default KartKlikk;