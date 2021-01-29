"use strict"

//chrono:
var chrono = document.querySelector("#chrono");
var time = 0;
var count;

//start the chrono:
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

//pause and restart where it paused the chrono:
function chronoPause() {
    if (chrono.value != "off") {
        chrono.value = "off";
        clearInterval(count)
    } else {
        chronoStart()
        chrono.value = "on";
    }
};

//stop and reset the chrono:
function chronoStop() {
    time = 0;
    chrono.value = "on";
    clearInterval(count);
};

//stop, reset and restartthe chrono:
function chronoInit() {
    chronoStop();
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