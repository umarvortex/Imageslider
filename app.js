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
let instructionsShown = false;

// Set the countdown date (5 days from now)
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 5);

// Additional MCQs to make a total of 100
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
    { question: "What is a sandbox in software security?", options: ["A testing environment isolated from the production network", "A game development platform", "A database management system", "A coding challenge platform"], answer: 0 },
    { question: "What is the purpose of cookies in web browsers?", options: ["Store user preferences and login information", "Speed up website loading", "Protect against malware", "Compress web content"], answer: 0 },
    { question: "Which algorithm is used for sorting data in O(n log n) time complexity?", options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"], answer: 2 },
    { question: "What is the main component of a CPU?", options: ["Memory Unit", "Arithmetic Logic Unit", "Input/Output Unit", "Control Unit"], answer: 1 },
    { question: "What is the purpose of RAID in storage systems?", options: ["Data compression", "Data redundancy", "Data encryption", "Data normalization"], answer: 1 },
    { question: "What is the difference between RAM and ROM?", options: ["RAM is faster", "RAM is volatile, ROM is non-volatile", "ROM has larger capacity", "ROM is used for active processing"], answer: 1 },
    { question: "Which layer of the OSI model handles routing?", options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"], answer: 2 },
    { question: "What is a primary key in a database?", options: ["The fastest column to search", "A unique identifier for each record", "The first column in a table", "The most important data in a table"], answer: 1 },
    { question: "What does ACID stand for in database systems?", options: ["Atomicity, Consistency, Isolation, Durability", "Authentication, Compression, Integrity, Decryption", "Authorization, Caching, Indexing, Distribution", "Availability, Concurrency, Integration, Delivery"], answer: 0 },
    { question: "What is the purpose of normalization in databases?", options: ["Speed up queries", "Reduce data redundancy", "Encrypt sensitive data", "Compress data storage"], answer: 1 },
    { question: "Which of the following is not a type of NoSQL database?", options: ["Document store", "Key-value store", "Graph database", "Relational database"], answer: 3 },
    { question: "What is the purpose of SSH in networking?", options: ["Share files between computers", "Secure remote access to systems", "Set up virtual private networks", "Stream multimedia content"], answer: 1 },
    { question: "What is the purpose of a CDN (Content Delivery Network)?", options: ["Filter malicious web traffic", "Deliver content from servers closer to users", "Create dynamic web content", "Compress web content"], answer: 1 },
    { question: "What is a microservice architecture?", options: ["A system using very small processors", "Building applications as small, independent services", "A minimalist user interface design", "Low-level system programming"], answer: 1 },
    { question: "What is the primary benefit of containerization?", options: ["Reduce hardware costs", "Consistent application environments", "Eliminate the need for operating systems", "Improve network security"], answer: 1 },
    { question: "What is the purpose of TLS/SSL certificates?", options: ["Identify users uniquely", "Authenticate websites and enable encrypted connections", "Store website content securely", "Speed up website loading"], answer: 1 },
    { question: "What is Docker primarily used for?", options: ["Virtual machine management", "Container management", "Network security", "Database administration"], answer: 1 },
    { question: "What is CSRF in web security?", options: ["Cross-Site Request Forgery", "Client-Server Response Function", "Cross-Site Resource Filter", "Client Security Response Framework"], answer: 0 },
    { question: "What is the main purpose of version control systems like Git?", options: ["Speed up code execution", "Track and manage code changes", "Automate testing", "Deploy applications"], answer: 1 },
    { question: "What is the difference between TCP and UDP?", options: ["TCP is faster", "TCP guarantees delivery, UDP doesn't", "UDP is more secure", "TCP is only used for web browsing"], answer: 1 },
    { question: "What is the purpose of an ORM (Object-Relational Mapping)?", options: ["Convert database records to programming objects", "Optimize memory usage", "Organize resource management", "Orchestrate runtime modules"], answer: 0 },
    { question: "What is the purpose of JWT (JSON Web Token)?", options: ["Store JSON data efficiently", "Securely transmit information between parties", "Convert JSON to XML", "Verify JavaScript code"], answer: 1 },
    { question: "What is the main purpose of load testing?", options: ["Test application under heavy usage", "Test application on various devices", "Verify application works correctly", "Check for security vulnerabilities"], answer: 0 },
    { question: "What is the purpose of CI/CD in software development?", options: ["Code Investigation/Code Deployment", "Continuous Integration/Continuous Deployment", "Configuration Implementation/Configuration Distribution", "Centralized Interface/Component Development"], answer: 1 },
    { question: "What is the purpose of WebSockets?", options: ["Secure website connections", "Enable full-duplex communication", "Filter web content", "Optimize web images"], answer: 1 },
    { question: "What is the purpose of GraphQL?", options: ["Create visual data representations", "Query and manipulate data with a flexible API", "Process graphics more efficiently", "Generate graphics for web applications"], answer: 1 },
    { question: "What is the purpose of WebAssembly?", options: ["Write assembly code for websites", "Run near-native performance code on the web", "Assemble web components", "Create 3D web animations"], answer: 1 },
    { question: "What is the purpose of Redis?", options: ["In-memory data structure store", "Relational database system", "Remote desktop interface", "Resource distribution service"], answer: 0 },
    { question: "What is the purpose of Kubernetes?", options: ["Database management", "Container orchestration", "Network security", "Code testing"], answer: 1 },
    { question: "What is the primary purpose of Machine Learning Ops (MLOps)?", options: ["Optimize machine learning algorithms", "Operationalize machine learning workflows", "Create machine learning models", "Test machine learning systems"], answer: 1 },
    { question: "What is the purpose of Webpack in web development?", options: ["Security testing", "Module bundling", "Web server hosting", "Database management"], answer: 1 },
    { question: "What is the purpose of React.js?", options: ["Server-side scripting", "User interface building", "Database querying", "Testing automation"], answer: 1 },
    { question: "What is the purpose of Node.js?", options: ["Front-end development", "Server-side JavaScript execution", "Mobile app development", "Cloud computing"], answer: 1 },
    { question: "What is a RESTful API?", options: ["An API that requires minimal processing", "An API following REST architectural constraints", "An API that automatically rests inactive connections", "An API with restrictive security"], answer: 1 },
    { question: "What is the purpose of Elasticsearch?", options: ["Search and analytics engine", "Email delivery service", "Electronic signature validation", "Embedded systems language"], answer: 0 },
    { question: "What is the purpose of Hadoop?", options: ["High-performance computing", "Distributed storage and processing of big data", "Hardware acceleration for databases", "Handling domain operations"], answer: 1 },
    { question: "What is the purpose of TensorFlow?", options: ["Network flow optimization", "Machine learning framework", "Tensor mathematics calculator", "Flow-based programming"], answer: 1 },
    { question: "What is the purpose of Agile methodology?", options: ["Fast software development", "Flexible, iterative approach to project management", "Automated testing", "Advanced graphics implementation"], answer: 1 },
    { question: "What is the purpose of SCRUM in software development?", options: ["Screen users' computer resource usage monitoring", "A framework for Agile project management", "Security checks and recovery under maintenance", "Software creation review under management"], answer: 1 },
    { question: "What is the purpose of Kafka in distributed systems?", options: ["Testing framework", "Stream processing platform", "Data visualization", "Front-end framework"], answer: 1 },
    { question: "What is the purpose of MongoDB?", options: ["Monitor database growth", "NoSQL document database", "Mobile device gateway", "Memory optimization database"], answer: 1 },
    { question: "What is the purpose of Docker Compose?", options: ["Create Docker images", "Define and run multi-container Docker applications", "Compress Docker containers", "Create development environments"], answer: 1 },
    { question: "What is the purpose of Jenkins?", options: ["JavaScript enhancement", "Continuous integration server", "Job scheduling", "Java extension management"], answer: 1 }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const popup = document.getElementById('popup');
    const mcqSection = document.getElementById('mcqSection');

    // Check if a test has already been completed from this device
    const completedTest = localStorage.getItem('testCompleted');
    if (completedTest === 'true') {
        // Show already completed message
        document.body.innerHTML = `
            <div class="already-completed">
                <div class="already-completed-content">
                    <i class="fas fa-exclamation-circle"></i>
                    <h1>Test Already Completed</h1>
                    <p>You have already completed this test from this device.</p>
                    <p>Each student is allowed to take the test only once.</p>
                    <p>If you believe this is an error, please contact the administrator.</p>
                </div>
            </div>
        `;
        return;
    }

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

            // Check if this device/student has already taken the test by looking at previous submissions
            const previousTests = JSON.parse(localStorage.getItem('previousTests')) || [];
            const isDuplicate = previousTests.some(test => 
                test.phoneNumber === userData.phoneNumber || 
                (test.name.toLowerCase() === userData.name.toLowerCase() && 
                 test.city.toLowerCase() === userData.city.toLowerCase())
            );

            if (isDuplicate) {
                alert("It appears you have already taken this test. Each student is allowed only one attempt.");
                return;
            }

            // Save to localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Hide registration popup
            popup.classList.add('hidden');
            
            // Reset question index when starting a new test
            currentQuestionIndex = 0;
            localStorage.setItem('currentQuestion', currentQuestionIndex);
            
            // Show instructions popup
            showInstructionsPopup();
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

// Show the instructions popup
function showInstructionsPopup() {
    // Create instructions popup element
    const instructionsPopup = document.createElement('div');
    instructionsPopup.className = 'instructions-popup';
    instructionsPopup.innerHTML = `
        <div class="instructions-content">
            <h2><i class="fas fa-info-circle"></i> Important Instructions</h2>
            <hr>
            <p><strong>Time Limit:</strong> You have 1 hour and 30 minutes to complete this test.</p>
            <p><strong>Please Note:</strong></p>
            <ul>
                <li>Do not refresh the page or navigate away during the test.</li>
                <li>Do not attempt to cheat or use external resources.</li>
                <li>Answer the questions with honesty and integrity.</li>
                <li>The system will detect and record any suspicious activities.</li>
                <li>You cannot go back to previous questions once answered.</li>
                <li>Multiple security violations will be reported.</li>
            </ul>
            <p>By continuing, you agree to abide by these rules and acknowledge that your actions are being monitored.</p>
            <button id="startTestBtn" class="start-test-btn">I Understand, Start Test</button>
        </div>
    `;
    
    // Add the instructions popup to the body
    document.body.appendChild(instructionsPopup);
    
    // Add event listener to the start test button
    document.getElementById('startTestBtn').addEventListener('click', function() {
        // Remove the instructions popup
        instructionsPopup.remove();
        
        // Initialize the test
        initializeTest();
        
        // Mark instructions as shown
        instructionsShown = true;
    });
}

// Initialize or resume test
function initializeTest() {
    const mcqSection = document.getElementById('mcqSection');
    if (!mcqSection) return;

    // If this is a new test and instructions haven't been shown yet, show them first
    if (!testProgress && !instructionsShown) {
        showInstructionsPopup();
        return;
    }

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
            <div class="option-item ${isSelected ? 'selected' : ''}" data-option="${optIndex}">
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
    document.querySelectorAll('.option-item').forEach((option) => {
        option.addEventListener('click', function() {
            const optIndex = parseInt(this.getAttribute('data-option'));
            selectOption(index, optIndex);
        });
    });
}

// Select an option
function selectOption(questionIndex, optionIndex) {
    // Update selected option visually
    document.querySelectorAll('.option-item').forEach((option, idx) => {
        if (parseInt(option.getAttribute('data-option')) === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Save answer
    userAnswers[questionIndex] = optionIndex;
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    updateProgressBar();
    
    // After selecting an option, automatically go to next question after a short delay
    setTimeout(() => {
        if (questionIndex < mcqs.length - 1) {
            currentQuestionIndex = questionIndex + 1;
            localStorage.setItem('currentQuestion', currentQuestionIndex);
            loadQuestion(currentQuestionIndex);
        } else {
            showSubmitButton();
        }
    }, 800);
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
    localStorage.setItem('testCompleted', 'true');
    
    // Store this test data to prevent duplicate submissions
    const previousTests = JSON.parse(localStorage.getItem('previousTests')) || [];
    previousTests.push({
        name: results.userData.name,
        phoneNumber: results.userData.phoneNumber,
        city: results.userData.city,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('previousTests', JSON.stringify(previousTests));
    
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
        if (i < 20) { // Only include first 20 questions to avoid email size limits
            const userAnswer = results.answers[i] !== undefined ? results.answers[i] : 'Not answered';
            const correctAnswer = mcqs[i].answer;
            const isCorrect = userAnswer === correctAnswer;
            
            answersDetail += `Q${i+1}: ${isCorrect ? 'Correct' : 'Incorrect'}, `;
        }
    }
    
    // Use native form submission as a backup to EmailJS
    const formUrl = "https://formsubmit.co/" + ADMIN_EMAIL;
    
    // Create a hidden form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formUrl;
    form.style.display = 'none';
    
    // Add form fields
    const addField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    };
    
    // Add all the necessary fields
    addField('name', results.userData.name);
    addField('age', results.userData.age);
    addField('city', results.userData.city);
    addField('favoriteSubject', results.userData.favoriteSubject);
    addField('phoneNumber', results.userData.phoneNumber);
    addField('completionTime', new Date(results.completionTime).toLocaleString());
    addField('totalQuestions', mcqs.length);
    addField('answeredQuestions', answeredCount);
    addField('correctAnswers', correctCount);
    addField('score', results.score + '%');
    addField('securityViolations', results.securityViolations);
    addField('answerSummary', answersDetail);
    addField('_subject', `Test Results: ${results.userData.name}`);
    
    // Add honeypot to prevent spam
    addField('_honeypot', '');
    
    // Disable captcha
    addField('_captcha', 'false');
    
    // Add the form to the document and submit it
    document.body.appendChild(form);
    setTimeout(() => {
        try {
            form.submit();
        } catch (e) {
            console.error('Form submission error:', e);
        }
    }, 2000);
    
    // Show success message
    setTimeout(() => {
        document.querySelector('.loading-spinner').innerHTML = '<i class="fas fa-check"></i><p>Test completed successfully!</p>';
    }, 5000);
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