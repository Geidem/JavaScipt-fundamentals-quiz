var questions = [
    {
      question: "Commonly used data types do NOT include",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      question: "The condition of an if / else statement is inclosed with _____",
      choices: ["quotes", "curly brackets","parenthesis", "square brackets"],
      answer: "parenthesis"
    },
    {
      question: "Arrays in JavaScript can be used to store _____",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
    },
    {
      question: "String values must be enclosed within ____ when being assigned to variables",
      choices: ["commas", "curly brackets", "quotes", "parenthesis"],
      answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
      },
    
]



var currentQuestionIndex = 0;
var timeLeft = 30;
var timerInterval;
var score = 0;


var startBtn = document.getElementById("start-btn");
var quiz = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var gameOver = document.getElementById("game-over");
var scoreEl = document.getElementById("score");
var initialsInput = document.getElementById("initials");
var timeEl = document.getElementById("time");


startBtn.addEventListener("click", startQuiz);

// Start the quiz and timer
function startQuiz() {
  startBtn.style.display = "none";
  quiz.style.display = "block";
  showQuestion();
  timerInterval = setInterval(updateTimer, 1000);
}




// Show the current question and choices
function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", checkAnswer);
    choicesEl.appendChild(button);
  }
}

// Check if the answer is correct and update score and time
function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  var currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.answer) {
    score++;
    event.target.classList.add("correct");
  } else {
    timeLeft -= 10;
    event.target.classList.add("incorrect");
  }
  currentQuestionIndex++;
  setTimeout(function() {
    event.target.classList.remove("correct", "incorrect");
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }, 1000);
}

// End the quiz and show the final score form
function endQuiz() {
  clearInterval(timerInterval);
  quiz.style.display = "none";
  gameOver.style.display = "block";
  scoreEl.textContent = score;

  var initials = initialsInput.value.trim();
  if (initials !== "") {
    addScore();
  }
}

// Update the timer and check if time is up
function updateTimer() {
  timeLeft--;
  timeEl.textContent = timeLeft;
  if (timeLeft === 0) {
    endQuiz();
  }
}

var highScores = JSON.parse(localStorage.getItem("score")) || [];

function addScore(initials, score) {
    console.log(highScores)

  var newScore = { name: initials, score: score };
  highScores.push(newScore);
  highScores.sort(function(a, b) {
    return b.score - a.score;
  });
  highScores = highScores.slice(0, 5);
  localStorage.setItem("score", JSON.stringify(highScores));
}

function displayScores() {

  var scoresList = document.getElementById("high-scores");
  scoresList.innerHTML = "";
  for (var i = 0; i < highScores.length; i++) {
    var score = highScores[i];
    var listItem = document.createElement("li");
    listItem.textContent = score.name + " - " + score.score;
    scoresList.appendChild(listItem);
  }
}

var highScoresLink = document.getElementById("high-scores");

highScoresLink.addEventListener("click" , function(event) {
    event.preventDefault();
    displayScores(); 
    window.location.href = "high-scores.html"; 
});

