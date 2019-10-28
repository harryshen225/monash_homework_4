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
var curScore = -1;
var curInitial = document.getElementById("initial");
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


startQuiz.onclick = function(){
    startPage.setAttribute("style","display:none");
    quizPage.setAttribute("style", "display:block");
    renderQuizPage(questions[curQuestionIndex]);
}

function renderQuizPage(question){
    questionText.textContent = question.title;
    for(var i=0; i< question.choices.length;i++){
        var btn = document.createElement("button");
        btn.setAttribute("data-index",i);
        btn.innerHTML = i +  ".\t" + question.choices[i];
        choices.appendChild(btn);
        choices.appendChild(document.createElement("br"));
    }
}

function checkAnswer(question,inputAnswer){
    console.log("indexof: "+question.choices.indexOf(inputAnswer));
    if(question.choices.indexOf(inputAnswer)!== -1){
        judgement.innerHTML = "Correct!!";
    }
    else{
        judgement.innerHTML = "Wrong!!";
    }
}

function removeAllChild(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

choices.addEventListener("click",function(){
    event.preventDefault();
    user_choice = event.target;
    if (user_choice.matches("button")){
        checkAnswer(questions[curQuestionIndex],user_choice.getAttribute("data-index"));
        removeAllChild(choices);
        curQuestionIndex += 1;
        if(questions[curQuestionIndex]){
            renderQuizPage(questions[curQuestionIndex]);
        }
        else{
            quizPage.setAttribute("style", "display:none");
            finishingPage.setAttribute("style","display:block");
        }
    }
})

function renderLeaderBoard(){
    var ObjLeaderBoard = localStorage.getItem("leaderBoard");
    ObjLeaderBoard ? leaders = JSON.parse(ObjLeaderBoard) : leaders=[];
    
    leaders.push({initial: curInitial,score: curScore})
    console.log(leaders);
    updateLeaderBoard(leaders);
    
    //save to local storage
    localStorage.setItem("leaderBoard",JSON.stringify(leaders))

    var list = document.createElement("ol");
    for(var i = 0; i < leaders.length;i++){
        var li = document.createElement("li");
        li.innerHTML = i+1 + ".\t" + leaders[i];
        list.appendChild(li);
    }
    leaderBoardDiv.appendChild(list);
}

function leaderSort(a,b){
    if(a.score > b.score) return 1;
    if(a.score < b.score) return -1;
    return 0;
}

function updateLeaderBoard(leaders){
    leaders.sort(leaderSort);
}

btnClearHscore.onclick = function(){
    localStorage.setItem("leaderBoard","");
    renderLeaderBoard();
}

submitInitial.onclick = function(){
    finishingPage.setAttribute("style","display:none");
    highscorePage.setAttribute("style","display:block");

    renderLeaderBoard();
}



