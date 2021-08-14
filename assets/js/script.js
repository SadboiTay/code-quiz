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

// variable for timer and questions array
var time = 60;
var timerInterval;
var currentQuestionIndex = 0;

// create questions array with choices and answers
var questionsArr = [
    {
        q: "Who?",
        choices: ["yes", "no", "maybe", "for sure"],
        answer: "for sure"
    },
    {
        q: "What?",
        choices: ["yes", "no", "maybe", "for sure"],
        answer: "for sure"
    },
    {
        q: "When?",
        choices: ["yes", "no", "maybe", "for sure"],
        answer: "for sure"
    },
    {
        q: "Where?",
        choices: ["yes", "no", "maybe", "for sure"],
        answer: "for sure"
    },
    {
        q: "Why?",
        choices: ["yes", "no", "maybe", "for sure"],
        answer: "for sure"
    }
]

// functions
var startQuiz = function() {
    // hide startPage div
    startPageEl.style.display = "none";

    // show questions div
    questionsPageEl.style.display = "block";

    // start timer with setInterval
    var timerInterval = setInterval(timeCountdown, 1000);

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

        choiceButton.textContent = i+". "+choice;

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

// on click 'start quiz', show hidden questions div and start timer
startBtnEl.addEventListener("click", startQuiz);



// right answer give 'correct' response - go to next question

// wrong answer deducts 10 seconds, give 'wrong' response - go to next question

// when all questions answered OR time runs out, go to end-page with score

// accept intials input to save score

// on save, display high scores page which has 'start over' and 'delete' buttons