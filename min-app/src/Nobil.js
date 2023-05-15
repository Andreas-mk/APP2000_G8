import 'node-fetch';
import $ from 'jquery';

const nobilKey = "6f128b7050b466c9a661f763435dc116";
const url = "https://nobil.no/api/server/search.php?apiversion=3&apikey=" + nobilKey + "&action=search&type=stats_GetCountChargerConnectorsByConnectorTypeAndCapasity&countrycode=NOR&countycode=11&municipalitycode=1103&format=json"

const print = () => {
    console.log('dette er en test');
}
console.log('ja');
print();


//res.setHeader('Access-Control-Allow-Origin', '*')


const nobilTest = async () => {
    console.log("første");
    let headers = new fetch.Headers();
    console.log("andre");
    //headers.set("Access-Control-Allow-Origin", "*");// To allow all domains

    headers.set('apikey', nobilKey);
    headers.append('apiversion', '3');
    headers.append('action', "search");
    headers.append('type', 'near');
    headers.append('lat', '59.91673');
    headers.append('long', '10.74782');
    headers.append('distance', '2000');
    headers.append('limit', '10');

    const res = await fetch('https://nobil.no/api/server/search.php', {


        headers: headers,
        success: console.log("nok en test"),

    })
    const data = await res.json();
    console.log('tredje (data rett under)');
    console.log(data);
    return data;

}
//nobilTest();

const nobilTestTo = async () => {
    fetch('https://nobil.no/api/server/search.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apikey: nobilKey,
            apiversion: '3',
            action: 'search',
            type: 'near',
            lat: '59.91673',
            long: '10.74782',
            distance: '2000',
            limit: '10'
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}
//nobilTestTo();

async function postman() {
    $.ajax({
        type: 'GET',
        url: 'https://nobil.no/api/server/search.php',
        crossDomain: true,
        data: {
            'apikey': nobilKey,
            'apiversion': '3',
            'action': "search",
            'type': 'near',
            'lat': '59.4121414',
            'long': '9.0366312',
            'distance': '10000',
            'limit': '10'
        },
        success: printJsonResponse,
        dataType: 'json'
    });
}
//postman();

async function cors() {
    async function postman() {
        $.ajax({
            type: 'GET',
            url: 'https://nobil.no/api/server/search.php',

            data: {
                'apikey': nobilKey,
                'apiversion': '3',
                'action': "search",
                'type': 'near',
                'lat': '59.4121414',
                'long': '9.0366312',
                'distance': '10000',
                'limit': '10'
            },
            success: printJsonResponse,
            dataType: 'jsonp'
        });
    }
}
cors();
function printJsonResponse(data, textStatus, XMLHttpRequest) {
    $("#jsonOutput").html(dump(data));
}


function dump(arr, level) {
    var dumped_text = "";
    if (!level) level = 0;
    //The padding given at the beginning of the line. 
    var level_padding = "";
    for (var j = 0; j < level + 1; j++) level_padding += " ";
    if (typeof (arr) == 'object') { //Array/Hashes/Objects 
        for (var item in arr) {
            var value = arr[item];
            if (typeof (value) == 'object') { //If it is an array, 

                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += dump(value, level + 1);
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value +
                    "\"\n";
            }
        }
    } else { //Stings/Chars/Numbers etc. 
        dumped_text = "===>" + arr + "<===(" + typeof (arr) + ")";
    }
    return dumped_text;
}
async function apitest() {
    const testApi = "https://fakestoreapi.com/products/1";
    fetch(testApi)
        .then(res => {
            if (res.ok) {
                console.log(res.json());
            } else {
                console.log("Fail");
            }
        })
        .then(data => console.log(data))
        .catch(error => console.log(error))
}
//apitest();
/*
let response = await fetch(url);

if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json();
    console.log("egselent");
} else {
    console.log("feil");
    alert("HTTP-Error: " + response.status);
}




const pls = await fetch('https://nobil.no/api/server/search.php', {
    method: 'POST',
    apikey: '6f128b7050b466c9a661f763435dc116',
    apiversion: '3',
    action: "search",
    type: 'id',
    id: 'NOR_00171'
});
const komigjen = await pls.json();
*/
/*
jQuery.ajax({
    type: 'POST',
    url: 'https://nobil.no/api/server/search.php',
    data: {
        'apikey': nobilKey, 'apiversion': '3', 'action': "search",
        'type': 'id', 'id': 'NOR_00171'
    },
    success: printJsonResponse,
    dataType: 'json'
});

function printJsonResponse(data, textStatus, XMLHttpRequest) {
    jQuery("#jsonOutput").html(dump(data));
}
*/