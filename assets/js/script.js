// variables for DOM elements
var startBtnEl = document.querySelector('#start-btn')
var startPageEl = document.querySelector('#start-page');
var questionsPageEl = document.querySelector('#questions');
var timeEl = document.querySelector('#time');
var questionEl = document.querySelector('#Q');
var choicesEl = document.querySelector('#choices');

// variable for timer and questions array
var time = 60;
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
    // loop through questions array
    for (var i = 0; i < questionsArr.length; i++) {
        // set question to questionEl
        questionEl.textContent = questionsArr[i].q

        // loop over choices
        questionsArr[i].choices.forEach(function(choice, i)
        {
            // create new button for each choice
            var choiceButton = document.createElement("button");
            choiceButton.setAttribute("class", "btn");
            choiceButton.setAttribute("value", choice);

            choiceButton.textContent = i + "hello there";

            // display choice on page 
            choicesEl.appendChild(choiceButton);
        });
    }
    
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