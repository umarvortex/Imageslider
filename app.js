// Constants
const TOTAL_QUESTIONS = 100;
const MAX_SECURITY_VIOLATIONS = 3;
const ADMIN_EMAIL = "umarvortex@gmail.com";

// Store user data and test progress in localStorage
let userData = JSON.parse(localStorage.getItem('userData')) || null;
let testProgress = JSON.parse(localStorage.getItem('testProgress')) || null;
let currentQuestionIndex = parseInt(localStorage.getItem('currentQuestion')) || 0;
let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
let testStartTime = localStorage.getItem('testStartTime') || null;
let remainingTime = localStorage.getItem('remainingTime') || 5400; // 90 minutes in seconds

// Security measures
let securityViolations = 0;
let isFullscreen = false;
let lastActiveTime = Date.now();

// Global variables
let timeLeft = 90 * 60; // 1 hour 30 minutes in seconds
let timer;
let userName = "";
let userEmail = "";
let userAge = "";
let userCity = "";
let userFavoriteSubject = "";
let countdownEnded = false;

// Set the countdown date (5 days from now)
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 5);

// Update or extend the MCQs list to 100 questions
const mcqs = [
    { question: "Which of the following is a type of cyber attack that involves tricking users into revealing sensitive information?", options: ["DDoS", "Phishing", "Spoofing", "Brute Force"], answer: 1 },
    { question: "What does 'SQL' stand for in database technology?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Language"], answer: 0 },
    { question: "Which encryption method uses the same key for both encryption and decryption?", options: ["Asymmetric encryption", "Symmetric encryption", "Hashing", "PKI"], answer: 1 },
    { question: "What is the primary function of a firewall in network security?", options: ["Detect malware", "Block unauthorized access", "Encrypt data", "Speed up connection"], answer: 1 },
    { question: "What type of AI focuses on making machines think and behave like humans?", options: ["Neural Networks", "Machine Learning", "Strong AI", "Weak AI"], answer: 2 },
    { question: "Which of the following is not one of the three main types of machine learning?", options: ["Supervised Learning", "Reinforcement Learning", "Unsupervised Learning", "Distributed Learning"], answer: 3 },
    { question: "What does HTTPS stand for?", options: ["Hyper Text Transfer Protocol Secure", "Hyper Text Transport Protocol Secure", "Hyper Text Transfer Program Secure", "High Transfer Text Protocol System"], answer: 0 },
    { question: "Which of the following is an example of a statically typed programming language?", options: ["Python", "JavaScript", "Java", "PHP"], answer: 2 },
    { question: "What is the time complexity of a binary search algorithm?", options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"], answer: 2 },
    { question: "Which data structure follows the Last In First Out (LIFO) principle?", options: ["Queue", "Stack", "Linked List", "Tree"], answer: 1 },
    // Add more MCQ questions here to total 100
    { question: "What is Cross-Site Scripting (XSS)?", options: ["A virus that affects multiple websites", "A vulnerability allowing attackers to inject malicious scripts into web pages", "A method for sharing scripts between websites", "A technique for optimizing website loading"], answer: 1 },
    { question: "Which of the following authentication factors relies on something a user possesses?", options: ["Password", "Fingerprint", "Security token", "PIN"], answer: 2 },
    { question: "What is the purpose of a Virtual Private Network (VPN)?", options: ["Increase internet speed", "Create a secure connection over a public network", "Store large amounts of data", "Host multiple websites"], answer: 1 },
    { question: "What is the difference between HTTP and HTTPS?", options: ["HTTPS is faster", "HTTPS uses encryption", "HTTP is newer", "HTTP is more secure"], answer: 1 },
    { question: "Which algorithm is commonly used for secure password storage?", options: ["MD5", "SHA-256", "AES", "Bcrypt"], answer: 3 },
    { question: "What is the primary goal of Artificial Intelligence?", options: ["Create human-like robots", "Develop smart algorithms", "Create systems that can perform tasks that normally require human intelligence", "Speed up computer processing"], answer: 2 },
    { question: "What is the purpose of an Intrusion Detection System (IDS)?", options: ["Block unauthorized access", "Monitor network traffic for suspicious activity", "Encrypt sensitive data", "Speed up network performance"], answer: 1 },
    { question: "Which of the following is a common application of neural networks?", options: ["Database management", "Image recognition", "Network routing", "File compression"], answer: 1 },
    { question: "What is the role of the kernel in an operating system?", options: ["User interface", "Running applications", "Managing system resources", "Storing files"], answer: 2 },
    { question: "What is a man-in-the-middle attack?", options: ["A physical attack on server infrastructure", "An attack where communication between two parties is intercepted", "A social engineering technique", "A type of malware infection"], answer: 1 },
    { question: "What is a SQL injection attack?", options: ["A cyber attack aimed at databases", "A virus that affects SQL databases", "A method to optimize database queries", "A backup technique for databases"], answer: 0 },
    { question: "Which of the following best describes cloud computing?", options: ["A network of physical servers", "Delivering computing services over the internet", "A type of database", "A programming language"], answer: 1 },
    { question: "What is the purpose of a checksum?", options: ["Verify data integrity", "Compress data", "Encrypt data", "Speed up data access"], answer: 0 },
    { question: "Which of the following is NOT a common cybersecurity threat?", options: ["Phishing", "Malware", "Encryption", "Ransomware"], answer: 2 },
    { question: "What does IoT stand for?", options: ["Internet of Technology", "Internet of Things", "Infrastructure of Technology", "Integrated Online Technology"], answer: 1 },
    { question: "What is the purpose of a load balancer in a computer network?", options: ["Distribute network traffic", "Increase security", "Compress data", "Store backup data"], answer: 0 },
    { question: "What is the primary use of blockchain technology?", options: ["Artificial intelligence", "Network security", "Distributed ledger", "Cloud computing"], answer: 2 },
    { question: "Which of the following is a characteristic of good algorithm design?", options: ["High memory usage", "Complex implementation", "High efficiency", "Long execution time"], answer: 2 },
    { question: "What is a denial-of-service (DoS) attack?", options: ["A virus that deletes system files", "An attempt to make a system unavailable", "A technique to steal personal data", "A method to crack passwords"], answer: 1 },
    { question: "Which protocol is used for sending emails?", options: ["HTTP", "FTP", "SMTP", "SSH"], answer: 2 },
    { question: "What is the main challenge of Big Data?", options: ["Collection", "Storage", "Processing", "All of the above"], answer: 3 },
    { question: "What is multi-factor authentication?", options: ["Using multiple passwords", "Using multiple security questions", "Using two or more authentication methods", "Logging in from multiple devices"], answer: 2 },
    { question: "What is a hash function in cryptography?", options: ["A function that converts input data into a fixed-size string of bytes", "A method to encrypt data", "A technique to compress data", "A system to organize data"], answer: 0 },
    { question: "Which of the following best describes machine learning?", options: ["A specific programming language", "A field of AI that enables systems to learn from data", "A database management system", "A method to design hardware components"], answer: 1 },
    { question: "What is the primary function of a router in computer networks?", options: ["Connect multiple networks", "Prevent security breaches", "Store network data", "Increase network speed"], answer: 0 },
    { question: "What is the difference between a virus and a worm?", options: ["Worms are more harmful", "Viruses require human action to spread, worms self-replicate", "Viruses are newer than worms", "Worms affect only networks, not computers"], answer: 1 },
    { question: "What is a zero-day vulnerability?", options: ["A flaw discovered on the day of software release", "A security hole unknown to the vendor", "A vulnerability that cannot be fixed", "A flaw that takes zero days to exploit"], answer: 1 },
    { question: "Which of the following is NOT a common programming paradigm?", options: ["Object-oriented programming", "Functional programming", "Procedural programming", "Distributive programming"], answer: 3 },
    { question: "What does API stand for in software development?", options: ["Application Programming Interface", "Automated Program Interaction", "Application Process Integration", "Advanced Programming Implementation"], answer: 0 },
    { question: "What is the CAP theorem in distributed computing?", options: ["Consistency, Availability, Partition tolerance", "Computing, Algorithm, Programming", "Centralized, Advanced, Processing", "Concurrency, Automation, Performance"], answer: 0 },
    { question: "What is the main purpose of a compiler?", options: ["Run a program", "Convert source code to machine code", "Find errors in code", "Optimize code execution"], answer: 1 },
    { question: "Which of the following is a characteristic of deep learning?", options: ["It requires small datasets", "It uses multiple layers of neural networks", "It is easier to train than basic machine learning", "It does not require GPUs"], answer: 1 },
    { question: "What is a buffer overflow vulnerability?", options: ["When a program writes data beyond the boundaries of allocated memory", "When a computer runs out of memory", "When a buffer is filled too slowly", "When memory isn't properly allocated"], answer: 0 },
    { question: "What is the difference between HTTP and HTTPS protocols?", options: ["HTTPS is faster", "HTTPS uses SSL/TLS for encryption", "HTTP is newer", "HTTP is more secure"], answer: 1 },
    { question: "What is the primary purpose of a DNS server?", options: ["Store website data", "Translate domain names to IP addresses", "Filter malicious traffic", "Process database queries"], answer: 1 },
    { question: "Which of the following is a common use of data mining?", options: ["Extracting minerals from data centers", "Finding patterns in large datasets", "Creating digital currency", "Securing databases"], answer: 1 },
    { question: "What is the primary goal of DevOps practices?", options: ["Replace developers with automation", "Improve collaboration between development and operations teams", "Develop operations software", "Outsource IT operations"], answer: 1 },
    { question: "What is a sandbox in software security?", options: ["A testing environment isolated from the production network", "A game development platform", "A database management system", "A coding challenge platform"], answer: 0 }
    // Extend to 100 total questions (copy and modify existing ones)
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const popup = document.getElementById('popup');
    const mcqSection = document.getElementById('mcqSection');

    // Check if user has already registered and test is in progress
    if (userData && testProgress && !testProgress.completed) {
        popup.classList.add('hidden');
        initializeTest();
    }

    // Handle form submission
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from submitting normally
            
            // Get form data
            userData = {
                name: document.getElementById('name').value,
                age: document.getElementById('age').value,
                city: document.getElementById('city').value,
                favoriteSubject: document.getElementById('favoriteSubject').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                registrationTime: new Date().toISOString()
            };

            // Save to localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Hide registration popup
            popup.classList.add('hidden');
            
            // Initialize test
            initializeTest();
        });
    }

    // Add event listeners for navigation buttons
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    if (submitBtn) submitBtn.addEventListener('click', submitTest);

    // Security event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('keydown', handleKeyPress);
    setInterval(checkUserActivity, 1000);
});

// Initialize or resume test
function initializeTest() {
    const mcqSection = document.getElementById('mcqSection');
    if (!mcqSection) return;

    if (!testStartTime) {
        testStartTime = Date.now();
        localStorage.setItem('testStartTime', testStartTime);
    }

    // Initialize test progress
    testProgress = testProgress || {
        started: true,
        completed: false
    };
    localStorage.setItem('testProgress', JSON.stringify(testProgress));

    // Show MCQ section
    mcqSection.classList.remove('hidden');
    
    // Initialize the test interface
    loadQuestion(currentQuestionIndex);
    initializeQuestionIndicators();
    updateTimer();
    setInterval(updateTimer, 1000);
    requestFullscreen();
}

// Initialize question indicators
function initializeQuestionIndicators() {
    const questionIndicators = document.getElementById('questionIndicators');
    if (!questionIndicators) return;

    const indicatorsHTML = mcqs.map((_, index) => {
        const isAnswered = userAnswers[index] !== undefined;
        const isCurrent = index === currentQuestionIndex;
        // Display indicators but disable click functionality
        return `
            <div class="question-indicator ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}">
                ${index + 1}
            </div>`;
    }).join('');
    
    questionIndicators.innerHTML = indicatorsHTML;
}

// Load and display current question
function loadQuestion(index) {
    const mcqContainer = document.getElementById('mcqs');
    if (!mcqContainer) return;

    // Ensure index is within bounds
    if (index >= mcqs.length) {
        index = mcqs.length - 1;
        currentQuestionIndex = index;
    }

    const currentQuestion = mcqs[index];
    
    const optionsHTML = currentQuestion.options.map((option, optIndex) => {
        const isSelected = userAnswers[index] === optIndex;
        return `
            <div class="option-item ${isSelected ? 'selected' : ''}" onclick="selectOption(${index}, ${optIndex})">
                <input type="radio" name="option" id="option${optIndex}" ${isSelected ? 'checked' : ''}>
                <label for="option${optIndex}">${option}</label>
            </div>
        `;
    }).join('');

    mcqContainer.innerHTML = `
        <div class="question">
            <div class="question-header">
                <div class="question-number">Question ${index + 1} of ${mcqs.length}</div>
                <div class="question-text">${currentQuestion.question}</div>
            </div>
            <div class="options-container">
                ${optionsHTML}
            </div>
        </div>
    `;

    updateNavigationButtons();
    updateProgressBar();
    initializeQuestionIndicators();

    // Add click event listeners to options
    document.querySelectorAll('.option-item').forEach((option, optIndex) => {
        option.addEventListener('click', function() {
            selectOption(index, optIndex);
        });
    });
}

// Select an option
function selectOption(questionIndex, optionIndex) {
    userAnswers[questionIndex] = optionIndex;
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    
    // After selecting an option, automatically go to next question after a short delay
    setTimeout(() => {
        if (questionIndex < mcqs.length - 1) {
            nextQuestion();
        } else {
            showSubmitButton();
        }
    }, 500);
}

// Show submit button when all questions are answered
function showSubmitButton() {
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (nextBtn) nextBtn.classList.add('hidden');
    if (submitBtn) submitBtn.classList.remove('hidden');
}

// Navigation function - only forward
function nextQuestion() {
    if (currentQuestionIndex < mcqs.length - 1) {
        currentQuestionIndex++;
        localStorage.setItem('currentQuestion', currentQuestionIndex);
        loadQuestion(currentQuestionIndex);
    } else {
        // If on last question, show submit button
        showSubmitButton();
    }
}

// Update progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    const answeredCount = Object.keys(userAnswers).length;
    const progress = (answeredCount / mcqs.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Update navigation buttons
function updateNavigationButtons() {
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (nextBtn && submitBtn) {
        if (currentQuestionIndex === mcqs.length - 1) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }
}

// Security Functions
function handleVisibilityChange() {
    if (document.hidden) {
        recordSecurityViolation('Tab switched or minimized');
    }
}

function handleWindowBlur() {
    recordSecurityViolation('Window lost focus');
}

function handleKeyPress(e) {
    // Prevent common shortcut keys
    if ((e.ctrlKey || e.metaKey) && 
        (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 'p')) {
        e.preventDefault();
        recordSecurityViolation('Attempted to use restricted keyboard shortcut');
    }
}

function checkUserActivity() {
    const currentTime = Date.now();
    if (currentTime - lastActiveTime > 30000) { // 30 seconds
        recordSecurityViolation('User inactivity detected');
    }
    lastActiveTime = currentTime;
}

function recordSecurityViolation(reason) {
    securityViolations++;
    console.warn(`Security violation (${securityViolations}/${MAX_SECURITY_VIOLATIONS}): ${reason}`);
    
    // Show security warning
    const securityWarning = document.getElementById('securityWarning');
    if (securityWarning) {
        securityWarning.classList.add('visible');
        
        // Hide warning after 5 seconds
        setTimeout(() => {
            securityWarning.classList.remove('visible');
        }, 5000);
    }
    
    if (securityViolations >= MAX_SECURITY_VIOLATIONS) {
        alert('Multiple security violations detected. This incident will be reported.');
    }
}

function requestFullscreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    isFullscreen = true;
}

// Timer Functions
function updateTimer() {
    if (remainingTime <= 0) {
        submitTest();
        return;
    }

    remainingTime--;
    localStorage.setItem('remainingTime', remainingTime);

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = 
            `Time Left: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Calculate score for the test
function calculateScore() {
    let correctAnswers = 0;
    
    for (let i = 0; i < mcqs.length; i++) {
        if (userAnswers[i] === mcqs[i].answer) {
            correctAnswers++;
        }
    }
    
    return Math.round((correctAnswers / mcqs.length) * 100);
}

// Submit test and show results
function submitTest() {
    // Calculate results
    const score = calculateScore();
    const results = {
        userData: userData,
        score: score,
        completionTime: new Date().toISOString(),
        securityViolations: securityViolations,
        answers: userAnswers
    };
    
    // Mark test as completed
    testProgress = {
        ...testProgress,
        completed: true
    };
    
    localStorage.setItem('testResults', JSON.stringify(results));
    localStorage.setItem('testProgress', JSON.stringify(testProgress));
    
    // Hide MCQ section and show congratulations
    const mcqSection = document.getElementById('mcqSection');
    const congratsSection = document.getElementById('congratsSection');
    
    if (mcqSection) mcqSection.classList.add('hidden');
    if (congratsSection) congratsSection.classList.remove('hidden');
    
    // Send results to admin email
    sendResultsEmail(results);
}

// Send results to admin via email
function sendResultsEmail(results) {
    // Prepare the results data
    const answeredCount = Object.keys(results.answers).length;
    const correctCount = calculateCorrectAnswers(results.answers);
    
    // Format answers for email
    let answersDetail = '';
    for (let i = 0; i < mcqs.length; i++) {
        const userAnswer = results.answers[i] !== undefined ? results.answers[i] : 'Not answered';
        const correctAnswer = mcqs[i].answer;
        const isCorrect = userAnswer === correctAnswer;
        
        answersDetail += `Question ${i+1}: ${isCorrect ? 'Correct' : 'Incorrect'}\n`;
    }
    
    const emailParams = {
        to_email: ADMIN_EMAIL,
        subject: `Test Results: ${results.userData.name}`,
        message: `
Name: ${results.userData.name}
Age: ${results.userData.age}
City: ${results.userData.city}
Favorite Subject: ${results.userData.favoriteSubject}
WhatsApp: ${results.userData.phoneNumber}
Test Completion Time: ${new Date(results.completionTime).toLocaleString()}
Total Questions: ${mcqs.length}
Answered Questions: ${answeredCount}
Correct Answers: ${correctCount}
Score: ${results.score}%
Security Violations: ${results.securityViolations}

Answer Details:
${answersDetail}
        `
    };
    
    // Send email using EmailJS (you need to set up EmailJS with your service ID and template ID)
    emailjs.send('default_service', 'template_test_results', emailParams)
        .then(function(response) {
            console.log('Email sent successfully!', response);
            // After 5 seconds, show message that results have been sent
            setTimeout(() => {
                document.querySelector('.loading-spinner').innerHTML = '<i class="fas fa-check"></i><p>Results sent successfully!</p>';
            }, 5000);
        }, function(error) {
            console.error('Failed to send email', error);
        });
}

// Calculate total correct answers
function calculateCorrectAnswers(answers) {
    let correct = 0;
    for (let i = 0; i < mcqs.length; i++) {
        if (answers[i] === mcqs[i].answer) {
            correct++;
        }
    }
    return correct;
}

// Prevent right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Prevent copy-paste
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('paste', (e) => e.preventDefault());

// Handle page refresh/unload
window.addEventListener('beforeunload', (e) => {
    if (testProgress && !testProgress.completed) {
        e.preventDefault();
        e.returnValue = '';
    }
}); 