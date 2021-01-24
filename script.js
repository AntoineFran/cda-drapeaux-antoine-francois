"use strict"

document.addEventListener('DOMContentLoaded', () => {
    //start popup page:
    var startPopup = document.getElementById('start-popup');

    const startPopupOpen = function () {
        startPopup.setAttribute('aria-hidden', false);
    };

    const startPopupClose = function () {
        startPopup.setAttribute('aria-hidden', true);
    };

    startPopupOpen();

    $(function () {
        $('.start').click(function () {
            var pseudo = document.querySelector("#pseudo").value;
            document.querySelector(".pseudo-display").textContent = pseudo;
            startPopupClose();
            loadData();
            //Set the first level:
            setDisplay();
            chronoStart();
        });
    });


    //end popup page:
    var endPopup = document.getElementById('end-popup');

    const endPopupOpen = function () {
        document.querySelector(".pseudo-display-popup").textContent = $('.pseudo-display').text();
        document.querySelector("#nbLevel").textContent = $("#level").text();
        document.querySelector('#levelScore').textContent = $('#score').text();
        endPopup.setAttribute('aria-hidden', false);
    };

    const endPopupClose = function () {
        endPopup.setAttribute('aria-hidden', true);
    };

    $(function () {
        $('.next-level').click(function () {
            chronoPause();
            endPopupClose();
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
            var tenthSeconds = Math.round(
                (new Date().getTime() - startTime.getTime()) / 10 + chrono.paramTps);

            var seconds = parseInt(tenthSeconds / 100);
            tenthSeconds = tenthSeconds % 100;

            var minutes = parseInt(seconds / 60);
            seconds = seconds % 60;

            chrono.innerHTML = addZero(minutes) + ":" + addZero(seconds) + ":" + addZero(tenthSeconds);
            time++;
        }, 10);
    }

    function chronoPause() {
        if (chrono.value != "off") {
            chrono.value = "off";
            clearInterval(count)
        } else {
            chronoStart()
            chrono.value = "on";
        }
    };

    function chronoInit() {
        time = 0;
        chrono.value = "on";
        clearInterval(count);
        chronoStart();
    };

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
    var levelCountry = [0, 1, 3, 5];

    //flags pattern:
    var flagsPatternData = '{"col3":["0,0 0,200 111,200 111,0", "112,0 112,200 223,200 223,0", "224,0 224,200 336,200 336,0"], "row3":["0,0 336,0 336,66 0,66", "0,67 336,67 336,133 0,133", "0,134 336,134 336,200 0,200"], "row2":["0,0 336,0 336,100 0,100", "0,101 336,101 336,200 0,200", "0,0 0,0 0,0 0,0"], "triangle1Row2":["0,0 100,100 0,200", "1,0 336,0 336,100 101,100", "101,101 336,101 336,200 0,200"]}';
    var flagsPattern = JSON.parse(flagsPatternData);


    //colors, form, and index of the right answer for every country:
    var frenchColors = ['red', 'blue', 'white'];
    var frenchForm = flagsPattern.col3;
    var frenchFlag = [1, 2, 0];
    var belgiumColors = ['black', 'red', 'yellow'];
    var belgiumForm = flagsPattern.col3;
    var belgiumFlag = [0, 2, 1];
    var netherlandsColors = ['blue', 'white', 'red'];
    var netherlandsForm = flagsPattern.row3;
    var netherlandsFlag = [2, 1, 0];
    var germanColors = ['yellow', 'black', 'red'];
    var germanForm = flagsPattern.row3;
    var germanFlag = [1, 2, 0];
    var polishColors = ['green', 'red', 'white'];
    var polishForm = flagsPattern.row2;
    var polishFlag = [2, 1, 0];
    var czechRepublicColors = ['red', 'white', 'blue'];
    var czechRepublicForm = flagsPattern.triangle1Row2;
    var czechRepublicFlag = [2, 1, 0];

    //arrays of the countries, their colors, their form, and their flags:
    var countries = ['France', 'Belgium', 'The Netherlands', 'Germany', 'Poland', 'The Czech Republic'];
    var countryColors = [frenchColors, belgiumColors, netherlandsColors, germanColors, polishColors, czechRepublicColors];
    var countryForm = [frenchForm, belgiumForm, netherlandsForm, germanForm, polishForm, czechRepublicForm];
    var countryFlags = [frenchFlag, belgiumFlag, netherlandsFlag, germanFlag, polishFlag, czechRepublicFlag];




    $(function () {
        $('.flag-part').click(function () {
            //index of the part of the flag to work on:
            let indexFlag = $(this).attr('number');
            if (indexFlag != "") {
                //increase clickcounter
                $('#click').text(parseInt($('#click').text()) + 1);
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
                //check if the answer is right:
                validation();
            }
        })
    })

    function validation() {
        //Check if the answer is right
        if (countryFlags[indexCountry][0] == indexColors[0] && countryFlags[indexCountry][1] == indexColors[1] &&
            countryFlags[indexCountry][2] == indexColors[2]) {
            pointsCalculator();
            setTimeout(() => {
                if (indexCountry % 2 != 0) {
                    deleteDisplay();
                    //go to the next level and reinitiate the chrono: 
                    indexCountry++;
                    setDisplay();
                    chronoInit();
                } else {
                    endPopupOpen();
                    $('#level').text(parseInt($('#level').text()) + 1);
                    saveData();
                    deleteDisplay();
                    //go to the next level and reinitiate the chrono: 
                    indexCountry++;
                    setDisplay();
                    chronoInit();
                    chronoPause();
                    //update the levelcounter:
                }
            }, 150);
        }
    }

    function deleteDisplay() {
        //reset the index and the class:
        indexColors = [0, 0, 0];
        $('.flag-part').removeClass(countryColors[indexCountry][0]).removeClass(countryColors[indexCountry][1])
            .removeClass(countryColors[indexCountry][2]);
    }

    function setDisplay() {
        //display the name, the form and the first colors of the country:
        document.querySelector('.countryName').textContent = countries[indexCountry];
        $('.flag-part').addClass(countryColors[indexCountry][0]);
        $('.flag-part:nth-of-type(1)').attr('points', countryForm[indexCountry][0]).attr('number', '0');
        $('.flag-part:nth-of-type(2)').attr('points', countryForm[indexCountry][1]).attr('number', '1');
        $('.flag-part:nth-of-type(3)').attr('points', countryForm[indexCountry][2]).attr('number', '2');
        //reinitiate the clickcounter:
        $('#click').text(0);
    }

    function pointsCalculator() {
        //calcul the number of points to add every level:
        const optimumNbrOfClick = countryFlags[indexCountry][0] + countryFlags[indexCountry][1] + countryFlags[indexCountry][2];
        if ($('#click').text() <= optimumNbrOfClick && parseInt(time / 100) <= optimumNbrOfClick) {
            $('#score').text(parseInt($('#score').text()) + 3);
        } else if (parseInt(time / 100) <= optimumNbrOfClick) {
            $('#score').text(parseInt($('#score').text()) + 2);
        } else {
            $('#score').text(parseInt($('#score').text()) + 1);
        }
    }

    function saveData() {
        //save the level, pseudo and score of the player:
        localStorage.setItem("level", document.querySelector("#level").textContent);
        localStorage.setItem("pseudo", document.querySelector(".pseudo-display").textContent);
        localStorage.setItem("score", document.querySelector("#score").textContent);
    }

    function loadData() {
        //check if the pseudo is the same than the one register:
        if (localStorage.getItem("pseudo") == document.querySelector(".pseudo-display").textContent) {
            //set the level and the score:
            document.getElementById("level").innerHTML = localStorage.getItem("level");
            document.getElementById("score").innerHTML = localStorage.getItem("score");
            indexCountry = levelCountry[localStorage.getItem("level") - 1];
        }
    }

    $('#joker').click(function () {
        if (document.querySelector("#score").textContent >= 1) {
            //remove 1 point from the score:
            document.querySelector("#score").textContent = parseInt(document.querySelector("#score").textContent) - 1;
            let indexArea = 0;
            //check if the answer has already been given:
            let area = ['.flag-part:nth-of-type(1)', '.flag-part:nth-of-type(2)', '.flag-part:nth-of-type(3)'];
            for (let i = 0; i < area.length; i++) {
                if ($(area[indexArea]).attr('number') == "") {
                    indexArea++;
                }
            }
            //give one answer and freeze its area:
            indexColors[indexArea] = countryFlags[indexCountry][indexArea];
            $(area[indexArea]).removeClass(countryColors[indexCountry][indexArea]).removeClass(countryColors[indexCountry])
                .removeClass(countryColors[indexCountry]);
            $(area[indexArea]).addClass(countryColors[indexCountry][countryFlags[indexCountry][indexArea]]).attr('number', '');
            //check if the answer is right:
            validation()
        }
    });
});