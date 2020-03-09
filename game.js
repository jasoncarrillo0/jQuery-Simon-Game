
var buttonColors        = ["red","blue","green","yellow"];
var redSound            = new Audio("sounds/red.mp3");
var blueSound           = new Audio("sounds/blue.mp3");
var greenSound          = new Audio ("sounds/green.mp3");
var yellowSound         = new Audio("sounds/yellow.mp3");
var wrongSound          = new Audio("sounds/wrong.mp3");
let gamePattern         = [];
var userClickedPattern  = [];
var level               = 0; 
var i                   = 0; // loop counter
var started             = false;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// fills gamePattern array with 1 random color
// shows the user what to click
function nextSequence() {

    setTimeout(function(){
        randomNumber = randomIntFromInterval(0, 3);
        randomColor  = buttonColors[randomNumber];
        gamePattern.push(randomColor);
        showButtonAnimation(randomColor);
        level += 1;
        $("#level-title").text("Level " + level);
        userClickedPattern = [];
    }, 500);   
}

// receives a color as a string, plays the corresponding audio, and animates the button
function showButtonAnimation (color) {
    selector = "#" + color;
    $(selector).addClass("animation");
    // play correct sound
    setTimeout(function () {
        switch (selector) {
            case '#red':
                redSound.play();
                break;
            case '#blue':
                blueSound.play();
                break;
            case '#green':
                greenSound.play();
                break;
            case '#yellow':
                yellowSound.play();
                break;
            default:
                alert("Error: Incorrectly formatted color.");
                break;
        }
        // remove animation class
        $(selector).removeClass("animation");
    }, 200);
}

function gameOver() {
    $("h1").text("Game Over");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 500);
    wrongSound.play();
    gamePattern = [];
    level = 0;
    started = false;
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            nextSequence();
        }
    }
    else {
        gameOver();
    }
}


$(document).on("keydown", function(e) {
    if (e.key == " " && started == false) {
        $("#level-title").text("Level " + level);
        started = true;
        nextSequence();
    }
});

$(".btn").on("click", function (){
    var userChosenColor = this.id;
    showButtonAnimation(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});