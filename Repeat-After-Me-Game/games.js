var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;

var flag = false;
$(document).on("keypress", function(){
    if(flag==false){
        nextSequence();
        flag = true;
    }
});

function playSound(colour){
    var audio = new Audio("sounds/"+colour+".mp3");
    audio.play();
}

function nextSequence(){
    userClickPattern = [];
    level++;
    $("#level-title").text("level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChossenColour = buttonColours[randomNumber];
    gamePattern.push(randomChossenColour);

    var id = "#"+randomChossenColour;
    $(id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChossenColour);
}

function animate(colour){
    $("#"+colour).addClass("pressed");
    setTimeout(function(){
        $("#"+colour).removeClass("pressed");
    }, 100);
}


$(".btn").on("click", function(){
    var userChoosenColour = $(this).attr("id");
    userClickPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animate(userChoosenColour);

    checkAnswer(userClickPattern.length-1);
});


function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over! Press any key to start");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    flag = false;
    level = 0;
    gamePattern = [];
}