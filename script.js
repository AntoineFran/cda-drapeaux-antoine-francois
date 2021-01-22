"use strict"

//index of the color to show on each part of the flag:
var indexColors = [0, 0, 0];
//index of the country to guess:
var indexCountry = 0;

//colors, form, and index of the right answer for every country:
var frenchColors = ['blue', 'white', 'red'];
var frenchForm = 'row'
var frenchFlag = [0, 1, 2];
var belgiumColors = ['black', 'yellow', 'red'];
var belgiumForm = 'row';
var belgiumFlag = [0, 1, 2];
var netherlandsColors = ['blue', 'white', 'red'];
var netherlandsForm = 'column'
var netherlandsFlag = [2, 1, 0];
var germanColors = ['black', 'yellow', 'red'];
var germanForm = 'column';
var germanFlag = [0, 2, 1];

//arrays of the countries, their colors, their form, and their flags:
var countries = ['France', 'Belgium', 'Netherlands', 'Germany'];
var countryColors = [frenchColors, belgiumColors, netherlandsColors, germanColors];
var countryForm = [frenchForm, belgiumForm, netherlandsForm, germanForm];
var countryFlags = [frenchFlag, belgiumFlag, netherlandsFlag, germanFlag];

$(function(){
    $('.flag-part').click(function() {
        //index of the part of the flag to work on:
        let indexFlag = $(this).attr('number');
        //set the index of the part of the flag which is concerned by the click:
        indexColors[indexFlag]++;
        if(indexColors[indexFlag] == countryColors[indexCountry].length){
            indexColors[indexFlag] = 0;
        }
        // remove the actual color of the part of the flag and add the next color:
        if (indexColors[indexFlag] == 0){
            $(this).removeClass(countryColors[indexCountry][countryColors[indexCountry].length - 1]);
            $(this).addClass(countryColors[indexCountry][indexColors[indexFlag]]);
        } else if (indexColors[indexFlag] > 0 && indexColors[indexFlag] < countryColors[indexCountry].length) {
            $(this).removeClass(countryColors[indexCountry][indexColors[indexFlag] - 1]);
            $(this).addClass(countryColors[indexCountry][indexColors[indexFlag]]);
        }
    })
   
    $('button').click(function() {
        //Check if the answer is right
        if (countryFlags[indexCountry][0] == indexColors[0] && countryFlags[indexCountry][1] == indexColors[1] && countryFlags[indexCountry][2] == indexColors[2]) {
            alert('OK');
            if(indexCountry < countries.length - 1){
                //reset the index and the class:
                indexColors = [0, 0, 0];
                $('.flag-part').removeClass(countryColors[indexCountry][0]).removeClass(countryColors[indexCountry][1]).removeClass(countryColors[indexCountry][2]);
                $('.flag').removeClass(countryForm[indexCountry]);
                
                //go to the next country, and display the name, the form and the first colors of the country:
                indexCountry++;
                document.querySelector('h1').textContent= countries[indexCountry];
                $('.flag-part').addClass(countryColors[indexCountry][0])
                $('.flag').addClass(countryForm[indexCountry])
            } else {
                alert('The End')
            }
        } else {
            alert('KO');
        }
    })
})