 // Test Configuration
const TEST_DURATION = 60 * 60; // 60 minutes in seconds
const TOTAL_QUESTIONS = 100;
let currentQuestion = 0;
let answers = new Array(TOTAL_QUESTIONS).fill(null);
let timerInterval;
let testStarted = false;

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const questionCounter = document.getElementById('question-counter');
const timerElement = document.getElementById('timer');
const fullscreenWarning = document.getElementById('fullscreen-warning');
const tabChangeWarning = document.getElementById('tab-change-warning');

// Load questions from JSON file
let questions = [];

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion(0);
        startTimer();
        initSecurityFeatures();
    })
    .catch(error => {
        console.error('Error loading questions:', error);
        questionText.textContent = 'Error loading questions. Please refresh the page.';
    });

// Display question
function showQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    
    currentQuestion = index;
    const question = questions[index];
    
    questionText.textContent = `${index + 1}. ${question.question}`;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        if (answers[index] === i) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(i));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.style.display = index === questions.length - 1 ? 'none' : 'block';
    submitBtn.style.display = index === questions.length - 1 ? 'block' : 'none';
    
    // Update question counter
    questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
}

// Select option
function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.toggle('selected', i === optionIndex);
    });
}

// Navigation functions
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    }
});

submitBtn.addEventListener('click', submitTest);

// Timer function
function startTimer() {
    let timeLeft = TEST_DURATION;
    
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time Left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest();
        } else {
            timeLeft--;
        }
    }
    
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

// Submit test
function submitTest() {
    clearInterval(timerInterval);
    
    // Calculate score
    let score = 0;
    questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
            score++;
        }
    });
    
    // In a real system, you would send this to your server
    alert(`Test submitted! Your score: ${score}/${questions.length}`);
    
    // Disable all interactions
    document.querySelectorAll('.option').forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    submitBtn.disabled = true;
}

// Anti-Cheating Security Features
function initSecurityFeatures() {
    // Fullscreen requirement
    document.addEventListener('fullscreenchange', checkFullscreen);
    document.addEventListener('webkitfullscreenchange', checkFullscreen);
    document.addEventListener('mozfullscreenchange', checkFullscreen);
    document.addEventListener('MSFullscreenChange', checkFullscreen);
    
    // Tab change detection
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Right-click disable
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Prevent keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
        }
    });
    
    // Initial fullscreen check
    checkFullscreen();
}

function checkFullscreen() {
    const isFullscreen = document.fullscreenElement || 
                        document.webkitFullscreenElement || 
                        document.mozFullScreenElement || 
                        document.msFullscreenElement;
    
    if (!isFullscreen) {
        fullscreenWarning.style.display = 'flex';
        document.body.style.opacity = '0.5';
        document.body.style.pointerEvents = 'none';
    } else {
        fullscreenWarning.style.display = 'none';
        document.body.style.opacity = '1';
        document.body.style.pointerEvents = 'auto';
        testStarted = true;
    }
}

function handleVisibilityChange() {
    if (document.hidden && testStarted) {
        tabChangeWarning.style.display = 'flex';
    } else {
        tabChangeWarning.style.display = 'none';
    }
}

// Request fullscreen when warning is clicked
fullscreenWarning.addEventListener('click', requestFullscreen);

function requestFullscreen() {
    const elem = document.documentElement;
    
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}