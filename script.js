const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephent", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },

    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "New Zealand", correct: false },
            { text: "Sri Lanka", correct: false },
        ]
    },

    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },

    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    },

    {
        question: "Which country has the most islands in the world?",
        answers: [
            { text: "Norway", correct: false },
            { text: "Greece", correct: false },
            { text: "Sweden ", correct: true },
            { text: "Switzerland", correct: false },
        ]
    },
]

let quesStatement = document.querySelector("#question");
let ansButton = document.querySelector(".answerBtns");
let nextButton = document.querySelector(".nextBtn");

let currQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function resetState() {
    nextButton.style.display = "none";
    while (ansButton.firstChild) {
        ansButton.removeChild(ansButton.firstChild);
    }
}

function showQuestion() {
    resetState();
    let currQuestion = questions[currQuestionIndex]
    let questionNo = currQuestionIndex + 1;
    quesStatement.innerHTML = questionNo + ". " + currQuestion.question;

    currQuestion.answers.forEach(function (ans) {
        let button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("optionBtn");
        ansButton.append(button);
        if (ans.correct) {
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click", function (e) {
            let selectedBtn = e.target;
            let isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                button.style.background = "#9aeabc";
                button.style.color = "black";
                score++;
            }
            else {
                button.style.background="#ff9393";
                button.style.color ="black";
            }
            Array.from(ansButton.children).forEach(function (btn){
                if(btn.dataset.correct === "true"){
                    btn.style.background = "#9aeabc";
                    btn.style.color = "black";
                }
                btn.disabled = true;
            })
            nextButton.style.display = "block";
        });
    })
}

nextButton.addEventListener("click", function(){
    if(currQuestionIndex < questions.length){
        currQuestionIndex++;
        if(currQuestionIndex < questions.length){
            showQuestion();
        }
        else{
            resetState();
            quesStatement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
            nextButton.innerHTML = "Solve Again";
            nextButton.style.display = "block";
        }
    }
    else{
        startQuiz();
    }
})

startQuiz();