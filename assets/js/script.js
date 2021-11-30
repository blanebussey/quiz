// settings
const storageKey = "highscores";
const correctAnswerBonus = 10;
var time = 60;


// DOM elements
const timerEl = document.getElementById("timer");
const questionsEl = document.getElementById("questions");
const ledgerEl = document.getElementById("ledger");
const initialsEl = document.querySelector("#high-scores input");
const scoreEl = document.getElementById("score");


// app state variables
var currentQuestions;
var currentScore;


// init (performed once when the page loads)
// often used for adding event listeners
//play button:
document.querySelector("#start button").addEventListener("click", startGame);
//high score name submit button
document.querySelector("#high-scores button").addEventListener("click", addHighScore);


// game manager
function startGame(){
	//starts the quiz
  	//change game state/view
  	document.body.className = "game";
  	//setup questions
  	setupQuestions();
  	//setup score
  	currentScore = 0;
  	startTimer();
  	//start quiz manager
}
function endGame(){
	document.body.className = "postgame";
  	showScore();
}

// timer
function startTimer() {
    var timer =  setInterval(function(){
    time -= 1;
    timerEl.innerHTML = `${time} seconds left`;
    if (time <= 0){
        clearInterval(timer);
        endGame();
    }
}, 1000);
}

// questions & answers gameplay
function setupQuestions(){
	//randomize questions
  	currentQuestions = shuffle(questions);
  	//load first question
  	loadQuestion();
}
function loadQuestion() {
    //access first question the array
     var Que = currentQuestions[0]
    //if there are no more quesitons, then game is over 
    if (!Que) return endGame()
    //display the questions using the dom
  	const answers = shuffle(Que.answers);
    var html = `<h2>${Que.question}</h2><ol>`;
  	for (let a of answers){
    	html += `<li><button>${a.text}</button></li>`;
    }
  	html += "</ol>";
  	questionsEl.innerHTML = html;
    //click the next question
    //add a click event handler to each button
  	for (let button of questionsEl.querySelectorAll("button")){
    	//loop through each button in questionsEl section
      	button.addEventListener("click", answerQuestion);
    }
}
function answerQuestion(e){
	//set the data what answer is clicked
    //display if answer is correct or not 
    //update score 
  	//e is the event object (originally from the OS)
  	//e.currentTarget is the button clicked on
  	//e.currentTarget.textContent is the text in the button
  	const userAnswer = e.currentTarget.textContent;
  	//find userAnswer in the currentQuestions
  	const isCorrect = currentQuestions[0].answers.find(a => a.text === userAnswer).correct;
  	//correct answer...increase score
  	if (isCorrect) score(correctAnswerBonus);
  	//incorrect answer...decrease time remaining
  	else {
          time -= 5
      }
  	//either way, go to the next question
    currentQuestions.shift(); //remove first question
  	loadQuestion();
}


// scores
function score(num){
	currentScore += num;
    setStorage()
}
function showScore(){
	scoreEl.textContent = currentScore;
}


// high scores
function addHighScore() {
	document.body.className = "pregame";
}



// data storage
// store data as a string to localStorage
// retrieve data as an object from localStorage
function setStorage(data){
	localStorage.setItem(storageKey, JSON.stringify(data));
}
function getStorage(){
	const data = localStorage.getItem(storageKey);
  	if (!data) return []; //nothing in storage, return empty array
  	return JSON.parse(data); //convert from string into object
}


// helpers (library functions)
function shuffle(arr){
	let clone = JSON.parse(JSON.stringify(arr)); //change copy, not original
  	return clone.sort(() => Math.random() - 0.5);
}


// data
const questions = [
    {
        question: "What is Grandma's birthday?",
        answers: [
            { text: 'November 1st', correct: true},
            { text: 'November 2nd', correct: false},
            { text: 'November 3rd', correct: false},
            { text: 'November 4th', correct: false},
        ]
    }, 
    {
        question: "What is Uncle Blane's birthday?",
        answers: [
            { text: "December 19th", correct: false},
            { text: "December 20th", correct: false},
            { text: "December 21st", correct: true},
            { text: "December 22nd", correct: false},
        ] 
    },
    {
        question: "What is Uncle Blake's birthday?",
        answers: [
            { text: "July 15th", correct: false},
            { text: "July 16th", correct: true},
            { text: "July 17th", correct: false},
            { text: "July 18th", correct: false},
        ] 
    },
    {
        question: "What is your Mom's birthday?",
        answers: [
            { text: "April 27th", correct: false},
            { text: "April 28th", correct: false},
            { text: "April 29th", correct: false},
            { text: "April 30th", correct: true},
        ] 
    }
]

