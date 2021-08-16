// variables for DOM elements
var startBtnEl = document.querySelector('#start-btn')
var startPageEl = document.querySelector('#start-page');
var questionsPageEl = document.querySelector('#questions');
var timeEl = document.querySelector('#time');
var questionEl = document.querySelector('#Q');
var choicesEl = document.querySelector('#choices');
var feedbackEl = document.querySelector('#feedback');
var endPageEl = document.querySelector('#end-page');
var scoreEl = document.querySelector('#final-score');
var submitBtnEl = document.querySelector('#submit');
var initialsEl = document.querySelector('#initials');

// variable for timer and questions array
var time = 75;
var timerInterval;
var currentQuestionIndex = 0;

// create questions array with choices and answers
var questionsArr = [
    {
        q: "What can loops offer JavaScript code as a whole?",
        choices: ["Added plug-ins.", "Cleaner syntax.", "Improved performance.", "Cross-platform support."],
        answer: "Improved performance."
    },
    {
        q: "What is the default behavior called that is used to move declarations to the top of the current scope?",
        choices: ["Jumping", "Arranging", "Sorting", "Hoisting"],
        answer: "Hoisting"
    },
    {
        q: "What are the identifiers called that cannot be used as variables or function names?",
        choices: ["Favorites", "Constants", "Reserved Words", "Concrete Terms"],
        answer: "Reserved Words"
    },
    {
        q: "What is a JavaScript element that represents either TRUE or FALSE values?",
        choices: ["Condition", "Boolean", "Event", "RegExp"],
        answer: "Boolean"
    },
    {
        q: "What is the name of the statement that is used to exit or end a loop?",
        choices: ["Break statement", "Close statement", "Conditional statement", "Falter statement"],
        answer: "Break statement"
    }
]

// functions
var startQuiz = function() {
    // hide startPage div
    startPageEl.style.display = "none";

    // show questions div
    questionsPageEl.style.display = "block";

    // start timer with setInterval
    timerInterval = setInterval(timeCountdown, 1000);

    // get questions
    getQuestion();
}

var getQuestion = function() {
    // get current question from array
    var currentQuestion = questionsArr[currentQuestionIndex];

    // display currentquestion to questionEl
    questionEl.textContent = currentQuestion.q;

    // clear previous choices
    choicesEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function(choice, i)
    {
        // create new button for each choice
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = i+1+". "+choice;

        // add click even listener on each choice
        choiceButton.onclick = questionClick;

        // display choice on page 
        choicesEl.appendChild(choiceButton);
    });
}

var questionClick = function() {
    // check if answer is right
    if (this.value === questionsArr[currentQuestionIndex].answer) {
        // give  feedback
        feedbackEl.textContent = "Correct!";
    } else {
        // penalize time
        time -= 15;
        
        if (time < 0) {
            time = 0;
        }

        // display new time
        timeEl.textContent = time;

        // give feedback
        feedbackEl.textContent = "Wrong!";
    }

    // display feedback for a second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout( function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // move to next question in currentQuestionIndex variable
    currentQuestionIndex++;

    // if out of questions, end quiz
    if (currentQuestionIndex === questionsArr.length) {
        endQuiz();
    } else {
        getQuestion();
    }
} 

var endQuiz = function() {
    // hide questions page
    questionsPageEl.style.display = "none";

    // show end page
    endPageEl.style.display = "block";

    // stop timer
    clearInterval(timerInterval);

    // show score
    scoreEl.textContent = time;
}

var timeCountdown = function() {
    // show timeEl
    timeEl.textContent = time;

    // tick down
    if (time > 0) {
        time--;
    } else {
        endQuiz();
    }
}

var saveHighscore = function() {
    // get value of user input
    var initials = initialsEl.value;

    // get saved scores from localstorge, and set to empty array if none found
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // create new score object
    var newScore = {
        score: time,
        initials: initials 
    };

    // save to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // go to highscores page
    window.location.href = "highscores.html";
}

// on click 'start quiz', run startQuiz
startBtnEl.addEventListener("click", startQuiz);

// on click 'submit', run saveHighscore;
submitBtnEl.addEventListener("click", saveHighscore);

// accept intials input to save score

// on save, display high scores page which has 'start over' and 'delete' buttons