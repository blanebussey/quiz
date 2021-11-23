//we need a timer to timer the test 

//we meed to formulate the questions and a way to score the answers
//would suppose if statements  

//will probably need loop to go through all the quesitons until finished with grade
// the grade would probably be formulated by some sort of if statement at the end 

/**/
const startingMinutes = 1;
let time = startingMinutes * 60;
const endTime = 0 
const timerEl = document.getElementById('timer');
let quizTimer = setInterval(updateTimer, 1000);
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-box')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex 

function updateTimer() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (time <= 0) {
        endGame()
    }
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // if seconds < 10 then add a '0' to the beginning of seconds or seconds just = seconds

    timerEl.innerHTML = `${minutes}: ${seconds}`;
    time--;
}

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
 resetState ()
 showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e)  {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove("hide")
    } else {
        //create a function to go high scores section instead of restart
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass (element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

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