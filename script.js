"use strict"

var flag = ['.color-left', '.color-middle', '.color-right'];
var colors = ['blue', 'white', 'red'];
var indexColors = [0, 0, 0];
var frenchFlag = [0, 1, 2];

$(function(){
    $('.flag').click(function() {
        let indexFlag = $(this).attr('number');
        indexColors[indexFlag]++;
        if(indexColors[indexFlag] == colors.length){
            indexColors[indexFlag] = 0;
        }
        if (indexColors[indexFlag] == 0){
            $(flag[indexFlag]).removeClass(colors[colors.length - 1]);
            $(flag[indexFlag]).addClass(colors[indexColors[indexFlag]]);
        } else if (indexColors[indexFlag] > 0 && indexColors[indexFlag] < colors.length) {
            $(flag[indexFlag]).removeClass(colors[indexColors[indexFlag] - 1]);
            $(flag[indexFlag]).addClass(colors[indexColors[indexFlag]]);
        }
    })
   
    $('button').click(function() {
        if (frenchFlag[0] == indexColors[0] && frenchFlag[1] == indexColors[1] && frenchFlag[2] == indexColors[2]) {
            alert('ok');
        } else {
            alert('ko');
        }
    })
})