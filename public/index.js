const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const imgQuestionElement = document.getElementById('img-question');
const textQuestionElement = document.getElementById('text-question');
let countRightAnswers = 0;
let shuffleQuestions, currentQuestionIndex;

const questions = [ {
    textQuestion: `Do you know what letter is missing 0 ?`,
    questions: ['C', '?', 'T'],
    answers: [
        { text: 'E', correct: false },
        { text: 'A', correct: true },
        { text: 'O', correct: false }
    ],
    svg: `./img/cat.svg`
},
{
    textQuestion: `Do you know what letter is missing 1 ?`,
    questions: ['B', '?', 'A', 'R'],
    answers: [
        { text: 'E', correct: true },
        { text: 'A', correct: false },
        { text: 'F', correct: false },
        { text: 'G', correct: false }
    ],
    svg: `./img/bear.svg`
},
{
    textQuestion: `Do you know what letter is missing 2 ?`,
    questions: ['L', 'I', '?', 'N'],
    answers: [
        { text: 'B', correct: false },
        { text: 'A', correct: false },
        { text: 'O', correct: true },
        { text: 'E', correct: false }
    ],
    svg: `./img/lion.svg`
},
{
    textQuestion: `Do you know what letter is missing 3 ?`,
    questions: ['F', 'O', '?'],
    answers: [
        { text: 'X', correct: true },
        { text: 'C', correct: false },
        { text: 'F', correct: false }
    ],
    svg: `./img/fox.svg`
}
]

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    console.log('Started');
    countRightAnswers = 0; // to reset the counter after the test started
    document.getElementById('right-answers').innerText = countRightAnswers;
    startButton.classList.add('hidden');
    shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hidden');
    questionContainerElement.classList.add('grid');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
        if(question === undefined) {
            window.location.href = 'index.html';
            alert(`Your score is ${countRightAnswers}. You should learn more`);
        }
        else {
        nextButton.classList.remove('hidden');

        textQuestionElement.innerText = question.textQuestion;

        question.questions.forEach(ques => {
        const quesElement = document.createElement('div');
        quesElement.innerText = ques;
        quesElement.classList.add(`ques`);
        questionElement.appendChild(quesElement);
        })

        const imgSrc = question.svg;
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', imgSrc);
        imgQuestionElement.appendChild(imgElement);

        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if(answer.correct) {
                button.dataset.correct = answer.correct;
            }
            answerButtonsElement.appendChild(button);
            button.addEventListener('click', (e) => {
                selectAnswer(e)
                console.log('Clicked');
            });
    })}
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hidden');
    
    // When i have firstChild, i remove everything
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild);
    }
    while (imgQuestionElement.firstChild) {
        imgQuestionElement.removeChild
        (imgQuestionElement.firstChild);
    }
    while (questionElement.firstChild) {
        questionElement.removeChild
        (questionElement.firstChild);
    }
    while (textQuestionElement.firstChild) {
        textQuestionElement.removeChild
        (textQuestionElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    if(correct) {
        ++countRightAnswers;
        document.getElementById('right-answers').innerText = countRightAnswers;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.add('pointer-events-none');
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hidden');
    }
    else {
        nextButton.classList.add('hidden');
        startButton.innerText = 'Restart';
        startButton.classList.remove('hidden');
        alert(`Your score is ${countRightAnswers}`)
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
      }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

