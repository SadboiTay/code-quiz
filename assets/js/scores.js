var printHighscores = function() {
    // get scores from storage, or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // sort scores by highest first
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        // create li for each score
        var scoreLI = document.createElement("li");
        scoreLI.textContent = score.initials+" - "+score.score;

        // print to page
        var olEl = document.querySelector('#highscores');
        olEl.appendChild(scoreLI);
    });
}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

printHighscores();