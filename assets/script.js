document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('start-btn');
    const questionContainer = document.getElementById('question');
    const choicesContainer = document.getElementById('choices');
    const timerElement = document.getElementById('time');
    const scoreElement = document.getElementById('score-value');
    const gameOverContainer = document.getElementById('game-over');
    const initialsInput = document.getElementById('initials');
    const submitBtn = document.getElementById('submit-btn');

    let timer;
    let timeRemaining = 60;
    let score = 0;
    let currentQuestionIndex = 0;

    const questions = [
        {
            question: 'What does HTML stand for?',
            choices: ['Hyper Text Markup Language', 'Highly Typed Machine Learning', 'Hyper Transfer Markup Language'],
            correctAnswer: 'Hyper Text Markup Language'
        },
        {
            question: 'Which HTML tag is used to create a hyperlink?',
            choices: ['<a>', '<h>', '<p>', '<link>'],
            correctAnswer: '<a>'
        },
        {
            question: 'What is the purpose of the <head> tag in HTML?',
            choices: ['To define the main content of the HTML document', 'To define the header section of the HTML document', 'To define the navigation links of the HTML document', 'To define metadata about the HTML document'],
            correctAnswer: 'To define metadata about the HTML document'
        },
        {
            question: 'Which HTML element is used to define the structure of an HTML document?',
            choices: ['<body>', '<structure>', '<html>', '<document>'],
            correctAnswer: '<html>'
        },
        {
            question: 'In HTML, which attribute is used to specify a short hint that describes the content of an <input> element?',
            choices: ['placeholder', 'hint', 'tooltip', 'description'],
            correctAnswer: 'placeholder'
        },
        {
            question: 'What does CSS stand for?',
            choices: ['Counter Strike: Source', 'Computer Style Sheets', 'Creative Style System', 'Cascading Style Sheets'],
            correctAnswer: 'Cascading Style Sheets'
        },
    ];
        // Six questions in total added

    function startQuiz() {
        startBtn.style.display = 'none';
        loadQuestion();
        timer = setInterval(updateTimer, 1000);
    }

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;

        choicesContainer.innerHTML = '';
        currentQuestion.choices.forEach((choice, index) => {
            const choiceElement = document.createElement('div');
            choiceElement.classList.add('choice');
            choiceElement.textContent = choice;
            choiceElement.addEventListener('click', () => checkAnswer(index));
            choicesContainer.appendChild(choiceElement);
        });
    }

    function checkAnswer(choiceIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion.choices[choiceIndex] === currentQuestion.correctAnswer) {
            score += 10;
        } else {
            timeRemaining -= 10;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }

    function updateTimer() {
        if (timeRemaining > 0) {
            timeRemaining--;
            timerElement.textContent = timeRemaining;
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(timer);
        questionContainer.textContent = 'Quiz Over!';
        choicesContainer.innerHTML = '';
        scoreElement.textContent = score;
        gameOverContainer.style.display = 'block';
    }

    function saveScore() {
        const initials = initialsInput.value.toUpperCase();
        // TODO: Save the score and initials 
        alert(`Score saved: ${score} for ${initials}`);
    }

    startBtn.addEventListener('click', startQuiz);
    submitBtn.addEventListener('click', saveScore);
});
