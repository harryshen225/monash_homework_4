var navTitle = document.getElementById("nav-title");
var timerValue = document.getElementById("timer_value");
var startQuiz = document.getElementById("start-quiz");
var questionText = document.getElementById("question-text");
var startPage = document.getElementById("start-page");
var quizPage = document.getElementById("quiz-page");
var choices = document.getElementById("choices");
var curQuestionIndex = 0;
var finishingPage = document.getElementById("finishing-page");
var initialForm = document.getElementById("initial-form");
var submitInitial = document.getElementById("submit-initial");
var highscorePage = document.getElementById("highscore-page");
var btnGoBack = document.getElementById("go-back");
var btnClearHscore = document.getElementById("clear-hscore");
var leaders;
var leaderBoardDiv = document.getElementById("leader-board");
var goBackBtn = document.getElementById("go-back");
var totalNumSec = 0;
var curInitial = document.getElementById("initial");
var timer;
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
];
var judgement = document.getElementById("judgement");
var curScore;

function renderTimer() {
    timerValue.textContent = totalNumSec;
    // console.log(totalNumSec);
}

function startTimer() {
    timer = setInterval(function () {
        if (totalNumSec > 0) {
            renderTimer();
            totalNumSec--;
        }
        else {
            clearInterval(timer);
        }
    }, 1000)
}


startQuiz.onclick = function () {
    startPage.setAttribute("style", "display:none");
    quizPage.setAttribute("style", "display:flex");
    curScore = questions.map(element => 0);
    totalNumSec = questions.length * 30;
    curQuestionIndex = 0;
    judgement.innerHTML = "";
    startTimer(totalNumSec);
    renderQuizPage(questions[curQuestionIndex]);
}

function renderQuizPage(question) {
    questionText.textContent = question.title;
    for (var i = 0; i < question.choices.length; i++) {
        var btn = document.createElement("button");
        btn.setAttribute("data-index", i);
        btn.innerHTML = i + ".\t" + question.choices[i];
        choices.appendChild(btn);
        choices.appendChild(document.createElement("br"));
    }
}

function checkAnswer(index, question, inputAnswer) {
    console.log(inputAnswer);
    console.log("indexof: " + question.choices[inputAnswer]);
    if (question.choices[inputAnswer] === question.answer) {
        judgement.innerHTML = "Previous Question: Correct!!";
        curScore[index] = 10;
    }
    else {
        judgement.innerHTML = "Previous Question: Wrong!!";
        totalNumSec -= 10;
    }
}

function removeAllChild(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

choices.addEventListener("click", function () {
    event.preventDefault();
    user_choice = event.target;
    if (user_choice.matches("button")) {
        checkAnswer(curQuestionIndex, questions[curQuestionIndex], user_choice.getAttribute("data-index"));
        removeAllChild(choices);
        curQuestionIndex += 1;
        if (questions[curQuestionIndex]) {
            renderQuizPage(questions[curQuestionIndex]);
        }
        else {
            quizPage.setAttribute("style", "display:none");
            clearInterval(timer);
            finishingPage.setAttribute("style", "display:block");
        }
    }
})

function updateLeaderBoard() {
    leaders.sort(leaderSort).reverse();
}

function updateRenderLeaderBoard() {
    var ObjLeaderBoard = localStorage.getItem("leaderBoard");
    ObjLeaderBoard ? leaders = JSON.parse(ObjLeaderBoard) : leaders = [];

    finalScore = Math.round(curScore.reduce((total, score) => total + score) * Math.log(totalNumSec));
    leaders.push({ initial: curInitial.value, score: finalScore })
    updateLeaderBoard();

    //save to local storage
    localStorage.setItem("leaderBoard", JSON.stringify(leaders))

    var list = document.createElement("ol");
    for (var i = 0; i < leaders.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = leaders[i].initial + "\t" + leaders[i].score;
        list.appendChild(li);
    }
    leaderBoardDiv.appendChild(list);
}

function renderLeaderBoard() {
    var ObjLeaderBoard = localStorage.getItem("leaderBoard");
    var lead;
    ObjLeaderBoard ? lead = JSON.parse(ObjLeaderBoard) : lead = [];
    if (lead) {
        var list = document.createElement("ol");
        for (var i = 0; i < lead.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = lead[i].initial + "\t" + lead[i].score;
            list.appendChild(li);
        }
        leaderBoardDiv.appendChild(list);
        console.log('run');
    }

}

function leaderSort(a, b) {
    if (a.score > b.score) return 1;
    if (a.score < b.score) return -1;
    return 0;
}

btnClearHscore.onclick = function () {
    localStorage.setItem("leaderBoard", "");
    leaderBoardDiv.innerHTML = "";
}

submitInitial.onclick = function () {
    finishingPage.setAttribute("style", "display:none");
    highscorePage.setAttribute("style", "display:block");
    updateRenderLeaderBoard();
}

goBackBtn.onclick = function () {
    highscorePage.setAttribute("style", "display:none");
    startPage.setAttribute("style", "display:block");
    leaderBoardDiv.innerHTML = "";
}


navTitle.onclick = function () {
    startPage.setAttribute("style", "display:none");
    highscorePage.setAttribute("style", "display:block");
    leaderBoardDiv.innerHTML = "";
    renderLeaderBoard();
}

