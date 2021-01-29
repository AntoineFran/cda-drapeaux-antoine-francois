"use strict"


//import of the countries data (json):
const loadJson = (url) => {
    let json = $.getJSON({
        'url': url,
        'async': false
    });
    json = JSON.parse(json.responseText);
    return json;
}
//save the data in the var countries:
var countries = loadJson("bdd/countries.json");

