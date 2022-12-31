var timeEl = document.querySelector("#time");
var startScreenEl = document.querySelector("#start-screen");
var startButtonEl = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var endScreenEl = document.querySelector("end-screen");
var finalScoreEl = document.querySelector("#final-score");
var submitBtnEl = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");


var score = 0;
var secondsLeft = 0
var selectedQuestion = 0;

// questions array
var questionsArray = [
    {
        question: "Commonly used datatypes do not include:",
        a: "strings",
        b: "booleans",
        c: "alerts",
        d: "numbers",
        correct: "c",
    },
    {
        question: "The condition in an if statement is enclosed within____?",
        a: "quotation marks",
        b: "curly braces",
        c: "square brackets",
        d: "parentheses",
        correct: "d",
    },
    {
        question: "Arrays in JavaScript can be used to store____?",
        a: "numbers and strings",
        b: "other arrays",
        c: "booleans",
        d: "all the above",
        correct: "d",
    },
    {
        question: "A very useful tool used during development and debugging for printing to the debugger is____?",
        a: "JavaScript",
        b: "terminal / bash",
        c: "console.log",
        d: "for loops",
        correct: "c",
    },
];

// function for the countdown timer

// buttons
// A start button that when clicked a timer starts and the first question appears.
startButtonEl.addEventListener("click", start);
submitBtnEl.addEventListener("click", submitScore);

function submitScore() {
    if (inputEl.value.length < 2) {
        var message = document.createElement("h3")
        message.setAttribute("class", "wrapper")
        message.setAttribute("style", "color: red;")
        message.textContent = "Name Cannot be less than 2 characters";
        bodyEl.appendChild(message);
    } else {
        // save data
        var user = [];
        var scoreTrack = [];
        var storedUsers = JSON.parse(localStorage.getItem("user"));
        var storedScore = JSON.parse(localStorage.getItem("score"));
        
        if (storedScore) {
            user = storedUsers;
            scoreTrack = storedScore;
        }
         //add new register to array
         user.push(inputEl.value.trim());
         scoreTrack.push(score);
         //add to localstorage
         localStorage.setItem("user", JSON.stringify(user));
         localStorage.setItem("score", JSON.stringify(scoreTrack));
 
         //call highscores
         window.location.href = "highscores.html";
    }

}

function setTime() {
    secondsLeft = 75;
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0 || secondsLeft < 0 || selectedQuestion > questionsArray.length) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            //show score and rank register
            finalScoreEl.textContent = score;
            questionsEl.setAttribute("class", "hide");
            endScreenEl.setAttribute("class", "start");
        }
    }, 1000);
}

function startGame() {
    // set timer
    setTime();
    // hide startScreen
    startScreenEl.setAttribute("class", "hide");
    // show question area
    questionsEl.setAttribute("class", "start");
    //create questions    
    nextQuestion();
}

function nextQuestion(event) {
    //if right answer add to score otherwise subtract 10 sec from timer   
    var message = document.createElement("h2")
    if (event.currentTarget.getAttribute("data-correctAnswer") === 'true') {
        score += 5;
        message.textContent = "Right answer";
    } else {
        message.textContent = "Wrong answer";
        secondsLeft -= 10;
    };
    event.currentTarget.parentElement.appendChild(message);
    //wait 1 second then get next question
    setTimeout(nextQuestion, 1000);
}

function getQuestion() {
    //clear old choices
    choicesEl.innerHTML = '';
    if (questionsArray[selectedQuestion]) {
        //get question and add to the Title
        questionTitleEl.textContent = questionsArray[selectedQuestion].question;
        //get all possible answer/choices for this question
        for (i = 0; i < questionsArray[selectedQuestion].choice.length; i++) {
            var choices = document.createElement("button");
            choices.textContent = questionsArray[selectedQuestion].choice[i][0];
            // store in the html if is right/wrong answer as dataset.
            choices.setAttribute("data-correctAnswer", questionsArray[selectedQuestion].choice[i][1]);
            choicesEl.appendChild(choices);
            choices.addEventListener("click", nextQuestion);
        }
    }
    selectedQuestion++;
}
//   * Questions contain buttons for each answer.
//   * 
//   * When answer is clicked, the next question appears
//   * 
//   * If the answer clicked was incorrect then subtract time from the clock

// * The quiz should end when all questions are answered or the timer reaches 0.

//   * When the game ends, it should display their score and give the user the ability to save their initials and their score
  