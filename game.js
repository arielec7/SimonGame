

var start = false;
var level = 0;
var pattern = [];
var clickPattern = [];
var buttons = ["red", "blue", "green", "yellow"];



$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});

$(".btn").click(function() {

  var selectedColor = $(this).attr("id");
  clickPattern.push(selectedColor);
//3 actions
  playSound(selectedColor);
  animatePress(selectedColor);
  checkAnswer(clickPattern.length-1);
});

function checkAnswer(currentLevel) {
//verify the Answer
    if (pattern[currentLevel] === clickPattern[currentLevel]) {
      if (clickPattern.length === pattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else { // wrong answer
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

//restart the game
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}

//generate sequence
function nextSequence() {
  clickPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttons[randomNumber];
  pattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//generate animation for the buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//restat the game
function startOver() {
  level = 0;
  pattern = [];
  start = false;
}
