"use strict"


 //index of the color to show on each part of the flag:
 var indexColors = [0, 0, 0];
 //index of the country to guess:
 var indexCountry = 0;


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

    //flag game:
    $(function () {
        $('.flag-part').click(function () {
            //index of the part of the flag to work on:
            let indexFlag = $(this).attr('number');
            if (indexFlag != "") {
                //increase clickcounter
                $('#click').text(parseInt($('#click').text()) + 1);
                //set the index of the part of the flag which is concerned by the click:
                indexColors[indexFlag]++;
                if (indexColors[indexFlag] == countries.country[indexCountry].colors.length) {
                    indexColors[indexFlag] = 0;
                }
                // remove the actual color of the part of the flag and add the next color:
                if (indexColors[indexFlag] == 0) {
                    $(this).addClass(countries.country[indexCountry].colors[indexColors[indexFlag]]);
                    $(this).removeClass(countries.country[indexCountry].colors[countries.country[indexCountry].colors.length - 1]);
                } else if (indexColors[indexFlag] > 0 && indexColors[indexFlag] < countries.country[indexCountry].colors.length) {
                    $(this).addClass(countries.country[indexCountry].colors[indexColors[indexFlag]]);
                    $(this).removeClass(countries.country[indexCountry].colors[indexColors[indexFlag] - 1]);
                }
                //check if the answer is right:
                validation();
            }
        })
    })

    function validation() {
        //Check if the answer is right
        if (countries.country[indexCountry].flag[0] == indexColors[0] && countries.country[indexCountry].flag[1] == indexColors[1] &&
            countries.country[indexCountry].flag[2] == indexColors[2]) {
            pointsCalculator();
            levelTransition();
        }
    }

    function levelTransition() {
        setTimeout(() => {
            //open the end level popup, save the stats and reset the display:
            endPopupOpen();
            saveData();
            deleteDisplay();
            if (indexCountry < countries.country.length - 1) {
                //go to the next level and reinitiate the chrono: 
                indexCountry++;
                chronoInit();
                chronoPause();
                //update the levelcounter and display the next level:
                $('#level').text(parseInt($('#level').text()) + 1);
                setDisplay();
            } else {
                chronoStop();
                $('.flag').hide();
                $('.btn').hide();
            }
        }, 150);
    }

    function deleteDisplay() {
        //reset the index and the class:
        indexColors = [0, 0, 0];
        $('.flag-part').removeClass(countries.country[indexCountry].colors[0]).removeClass(countries.country[indexCountry].colors[1])
            .removeClass(countries.country[indexCountry].colors[2]);
    }

    function setDisplay() {
        //display the name, the form and the first colors of the country:
        document.querySelector('.countryName').textContent = countries.country[indexCountry].name;
        $('.flag-part').addClass(countries.country[indexCountry].colors[0]);
        $('.flag-part:nth-of-type(1)').attr('points', countries.country[indexCountry].form[0]).attr('number', '0');
        $('.flag-part:nth-of-type(2)').attr('points', countries.country[indexCountry].form[1]).attr('number', '1');
        $('.flag-part:nth-of-type(3)').attr('points', countries.country[indexCountry].form[2]).attr('number', '2');
        //reinitiate the clickcounter:
        $('#click').text(0);
    }

    function pointsCalculator() {
        //calcul the number of points won:
        const optimumNbrOfClick = countries.country[indexCountry].flag[0] + countries.country[indexCountry].flag[1] + countries.country[indexCountry].flag[2];
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
        //check if the pseudo is the same than the one register and if the player didn't finish the game already:
        if (localStorage.getItem("pseudo") == document.querySelector(".pseudo-display").textContent && localStorage.getItem("level") < countries.country.length) {
            //set the level and the score:
            document.getElementById("level").innerHTML = (parseInt(localStorage.getItem("level"))+1);
            document.getElementById("score").innerHTML = localStorage.getItem("score");
            indexCountry = localStorage.getItem("level");
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
            indexColors[indexArea] = countries.country[indexCountry].flag[indexArea];
            $(area[indexArea]).removeClass(countries.country[indexCountry].colors[indexArea]).removeClass(countries.country[indexCountry].colors)
                .removeClass(countries.country[indexCountry].colors);
            $(area[indexArea]).addClass(countries.country[indexCountry].colors[countries.country[indexCountry].flag[indexArea]]).attr('number', '');
            //check if the answer is right:
            validation()
        }
    });


    $('#give-up').click(function () {
        levelTransition();
    });
});