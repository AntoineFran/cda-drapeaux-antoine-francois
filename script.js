"use strict"

document.addEventListener('DOMContentLoaded', () => { 
  const doc = document.querySelector('.starter-popup');
  var dialog = document.getElementById('dialog');
  const start = document.getElementsByClassName('start');

  const open = function () {
    dialog.setAttribute('aria-hidden', false);
  };

  const close = function () {
    dialog.setAttribute('aria-hidden', true);
  };

//   open();

  $(function () {
    $('.start').click(function () {
        chronoStart()
        close();
    });
  });
});




//chrono:
var chrono = document.querySelector("#chrono");
var time = 0;
var count;  


function chronoStart() {
    chrono.paramTps = time;
    var startTime = new Date();
    count = setInterval(() => {
        var seconds = Math.round(
            (new Date().getTime() - startTime.getTime()) / 1000 + chrono.paramTps);

        var minutes = parseInt(seconds / 60);
        seconds = seconds % 60;

        chrono.innerHTML = addZero(minutes) + ":" + addZero(seconds);
        time++;
    }, 1000);
}

//set the chrono display
function addZero(x) {
    if (x <= 10) {
        return '0' + x;
    } else {
        return x = '' + x
    }
}





//index of the color to show on each part of the flag:
var indexColors = [0, 0, 0];
//index of the country to guess:
var indexCountry = 0;

//flags pattern:
var row3 = ["0,0 0,200 111,200 111,0", "112,0 112,200 223,200 223,0", "224,0 224,200 336,200 336,0"];
var col3 = ["0,0 336,0 336,66 0,66", "0,67 336,67 336,133 0,133", "0,134 336,134 336,200 0,200"];
var col2 = ["0,0 336,0 336,100 0,100", "0,101 336,101 336,200 0,200", '0,0 0,0 0,0 0,0']

//colors, form, and index of the right answer for every country:
var frenchColors = ['blue', 'white', 'red'];
var frenchForm = row3;
var frenchFlag = [0, 1, 2];
var belgiumColors = ['black', 'yellow', 'red'];
var belgiumForm = row3;
var belgiumFlag = [0, 1, 2];
var netherlandsColors = ['blue', 'white', 'red'];
var netherlandsForm = col3;
var netherlandsFlag = [2, 1, 0];
var germanColors = ['black', 'yellow', 'red'];
var germanForm = col3;
var germanFlag = [0, 2, 1];
var polishColors = ['white', 'red'];
var polishForm = col2;
var polishFlag = [0, 1, 0];

//arrays of the countries, their colors, their form, and their flags:
var countries = ['France', 'Belgium', 'Netherlands', 'Germany', 'Poland'];
var countryColors = [frenchColors, belgiumColors, netherlandsColors, germanColors, polishColors];
var countryForm = [frenchForm, belgiumForm, netherlandsForm, germanForm, polishForm];
var countryFlags = [frenchFlag, belgiumFlag, netherlandsFlag, germanFlag, polishFlag];

//Set the first level:
setLevel();


$(function () {
    $('.flag-part').click(function () {
        //increase clickcounter
        $('#click').text(parseInt($('#click').text()) + 1);

        //index of the part of the flag to work on:
        let indexFlag = $(this).attr('number');
        //set the index of the part of the flag which is concerned by the click:
        indexColors[indexFlag]++;
        if (indexColors[indexFlag] == countryColors[indexCountry].length) {
            indexColors[indexFlag] = 0;
        }
        // remove the actual color of the part of the flag and add the next color:
        if (indexColors[indexFlag] == 0) {
            $(this).addClass(countryColors[indexCountry][indexColors[indexFlag]]);
            $(this).removeClass(countryColors[indexCountry][countryColors[indexCountry].length - 1]);
        } else if (indexColors[indexFlag] > 0 && indexColors[indexFlag] < countryColors[indexCountry].length) {
            $(this).addClass(countryColors[indexCountry][indexColors[indexFlag]]);
            $(this).removeClass(countryColors[indexCountry][indexColors[indexFlag] - 1]);
        }
        validate();
    })
})

function validate() {
    //Check if the answer is right
    if (countryFlags[indexCountry][0] == indexColors[0] && countryFlags[indexCountry][1] == indexColors[1] &&
        countryFlags[indexCountry][2] == indexColors[2]) {
        setTimeout(() => {
            if (indexCountry < countries.length - 1) {
                deleteLevel();
                //go to the next level: 
                indexCountry++;
                setLevel();
            } else {
                alert('The End' + time)
            }
        }, 150);
    }
}

function deleteLevel() {
    //reset the index and the class:
    indexColors = [0, 0, 0];
    $('.flag-part').removeClass(countryColors[indexCountry][0]).removeClass(countryColors[indexCountry][1])
        .removeClass(countryColors[indexCountry][2]);
    // $('.flag').removeClass(countryForm[indexCountry]);
}

function setLevel() {
    //display the name, the form and the first colors of the country:
    document.querySelector('h1').textContent = countries[indexCountry];
    $('.flag-part').addClass(countryColors[indexCountry][0]);
    $('.flag-part:nth-of-type(1)').attr('points', countryForm[indexCountry][0])
    $('.flag-part:nth-of-type(2)').attr('points', countryForm[indexCountry][1])
    $('.flag-part:nth-of-type(3)').attr('points', countryForm[indexCountry][2])
    //update the levelcounter:
    document.querySelector ('#level').textContent = indexCountry + 1;
}