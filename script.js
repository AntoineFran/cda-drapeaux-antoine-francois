"use strict"

// var flag = ['.color-left', '.color-middle', '.color-right'];
var colors = ['blue', 'white', 'red'];
var index = [0, 0, 0];
var frenchFlag = [0, 1, 2];

$(function(){
    $('.color-left').click(function() {
        index[0]++;
        if(index[0] == colors.length){
            index[0] = 0;
        }
        if (index[0] == 0){
            $('.color-left').removeClass(colors[colors.length - 1]);
            $('.color-left').addClass(colors[index[0]]);
        } else if (index[0] > 0 && index[0] < colors.length) {
            $('.color-left').removeClass(colors[index[0] - 1]);
            $('.color-left').addClass(colors[index[0]]);
        }
    })
    $('.color-middle').click(function() {
        index[1]++;
        if(index[1] == colors.length){
            index[1] = 0;
        }
        if (index[1] == 0){
            $('.color-middle').removeClass(colors[colors.length - 1]);
            $('.color-middle').addClass(colors[index[1]]);
        } else if (index[1] > 0 && index[1] < colors.length) {
            $('.color-middle').removeClass(colors[index[1] - 1]);
            $('.color-middle').addClass(colors[index[1]]);
        }
    })
    $('.color-right').click(function() {
        index[2]++;
        if(index[2] == colors.length){
            index[2] = 0;
        }
        if (index[2] == 0){
            $('.color-right').removeClass(colors[colors.length - 1]);
            $('.color-right').addClass(colors[index[2]]);
        } else if (index[2] > 0 && index[2] < colors.length) {
            $('.color-right').removeClass(colors[index[2] - 1]);
            $('.color-right').addClass(colors[index[2]]);
        }
    })
    $('button').click(function() {
        if (frenchFlag[0] == index[0] && frenchFlag[1] == index[1] && frenchFlag[2] == index[2]) {
            alert('ok');
        } else {
            alert('ko');
        }
    })
})