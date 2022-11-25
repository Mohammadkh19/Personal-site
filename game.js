var buttonColors = ["red", "blue", "green", "yellow"];
var GamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).on('keyup', function () {
    if (!started) {
        nextSequence();
        started = true;
        $("h1").text("level " + level);
    }
});


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(GamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === GamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);      
        }
    }
    else {
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        playSound("wrong");
        startOver();
    }  
}


function nextSequence() {
    userClickedPattern = [];
    var randomNum = Math.floor(Math.random(randomNum)*4);
    var randomChosenColor = buttonColors[randomNum];
    GamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("level " +level);
}

function playSound(name){
    var audio = new Audio ('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor){
    var pressedKey = $("#" + currentColor);
    pressedKey.addClass("pressed");
    setTimeout(function(){
        pressedKey.removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    GamePattern = [];
    started = false;
}
