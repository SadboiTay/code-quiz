// variables
var startBtnEl = document.querySelector('#start-btn')
var startPageEl = document.querySelector('#start-page');
var questionsPageEl = document.querySelector('#questions');
var timeEl = document.querySelector('#time');

var time = 60;

// create questions array
var questionsArr = [
    {
        q: "Who?"
    },
    {
        q: "What?"
    },
    {
        q: "When?"
    },
    {
        q: "Where?"
    },
    {
        q: "Why?"
    }
]

// functions
    // show hidden questions div and start timer
    var startQuiz = function() {
        // hide startPage div
        startPageEl.className = "hide";

        // show questions div
        questionsPageEl.style.display = "block";

        // start timer with setInterval
        var timeCountdown = setInterval(function() {
            // show timeEl
            timeEl.textContent = time;
            if (time > 0) {
                time--;
            } 

        }, 1000);

        console.log(questionsArr[1]);
    }
// end functions

// on click 'start quiz', show hidden questions div and start timer
startBtnEl.addEventListener("click", startQuiz);


// loop through questions array to pull one

// right answer give 'correct' response - go to next question

// wrong answer deducts 10 seconds, give 'wrong' response - go to next question

// when all questions answered OR time runs out, go to end-page with score

// accept intials input to save score

// on save, display high scores page which has 'start over' and 'delete' buttons