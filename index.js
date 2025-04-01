const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;

$(document).keydown(function () {
  $("h1").text(`Level ${level}`);

  if (level === 0) {
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  level++;
  $("h1").text(`Level ${level}`);
}

$(".box").click(function (e) {
  const userChosenColor = e.target.classList[1];
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
});

function playSound(name) {
  const sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}

function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`.${currentColor}`).removeClass("pressed");
  }, 100);
  $(`.${currentColor}`).fadeOut(100).fadeIn(100);
}

function checkAnswer(usersLast) {
  if (usersLast === gamePattern[userClickedPattern.length - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").text("Game over, press any key to restart");
    const sound = new Audio(`sounds/wrong.mp3`);
    sound.play();
    $("body").css("background", "red");
    setTimeout(function () {
      $("body").css("background", "rgb(62, 61, 61)");
    }, 200);
    $(document).keydown(startOver())
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
