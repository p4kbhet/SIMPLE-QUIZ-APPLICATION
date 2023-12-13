const quizData = [
    {
        question: "Sino ang pinaka loyal?",
        options: ["Nadine", "Summer", "Liza", "Kathryn"],
        correctAnswer: "Summer"
    },
    {
        question: "Ano ang gagawin pag may quiz?",
        options: ["Mag facebook", "Mag scroll sa tiktok", "Mag review", "Mag overthink"],
        correctAnswer: "Mag review"
    },
    {
        question: "Ano ang handa mo?",
        options: ["Sama nang loob", "Hinanakit", "Pagkain", "Handa kang mahalin"],
        correctAnswer: "Pagkain"
    },
    {
        question: "Christmas party game: ",
        options: ["Pabilisan magalit", "Pasamaan nang ugali", "Bring me: National ID", "Bring me: unfinished assignments and activities"],
        correctAnswer: "Bring me: National ID"
    },
    {
        question: "Ano ang gagawin pag walang pera?",
        options: ["Mag manifest sa facebook", "Magparinig sa magulang", "Mag trabaho", "Mamalimos"],
        correctAnswer: "Mag trabaho"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timerDuration = 10; 
let timeRemaining = timerDuration;

const quizNumberElement = document.getElementById("quiz-number");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const timerElement = document.getElementById("timer");
const feedbackElement = document.getElementById("feedback");

function loadQuestion() {
    clearInterval(timer);
    timeRemaining = timerDuration;

    const currentQuestion = quizData[currentQuestionIndex];
    quizNumberElement.textContent = `Question ${currentQuestionIndex + 1}`;
    questionElement.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(optionElement);
    });

    nextButton.style.display = "none";
    restartButton.style.display = "none";
    timerElement.textContent = `Time Remaining: ${timeRemaining}s`;

    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Time Remaining: ${timeRemaining}s`;

        if (timeRemaining === 0) {
            clearInterval(timer);
            showFeedback("Time's up!");
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const currentQuestion = quizData[currentQuestionIndex];
    const selectedOption = currentQuestion.options[selectedIndex];

    optionsContainer.childNodes.forEach((optionElement, index) => {
        optionElement.style.backgroundColor = index === selectedIndex
            ? (selectedOption === currentQuestion.correctAnswer ? "#4caf50" : "#f44336") 
            : (currentQuestion.options[index] === currentQuestion.correctAnswer ? "#4caf50" : "#fff"); 
        optionElement.style.pointerEvents = "none";
    });

    nextButton.style.display = "block";

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        showFeedback("Correct!");
    } else {
        showFeedback(`Incorrect! The correct answer is ${currentQuestion.correctAnswer}.`);
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    feedbackElement.textContent = "";

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizNumberElement.textContent = ""; 
    questionElement.textContent = "Quiz Completed!";
    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
    restartButton.style.display = "block";
    timerElement.textContent = "";
    feedbackElement.textContent = `Your Score: ${score} out of ${quizData.length}`;
}

function showFeedback(message) {
    feedbackElement.textContent = message;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function startQuiz() {
    document.getElementById("title").style.display = "none";
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("next-btn").style.display = "block";
    loadQuestion();
}
