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
let resultsSent = false;

// Set the countdown date (5 days from now)
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 5);

// MCQs - Adding 10 more computer science questions related to entry tests in Pakistan
const mcqs = [
    { question: "Which of the following is a type of cyber attack that involves tricking users into revealing sensitive information?", options: ["DDoS", "Phishing", "Spoofing", "Brute Force"], answer: 1 },
    { question: "What does 'SQL' stand for in database technology?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Language"], answer: 0 },
    { question: "Which encryption method uses the same key for both encryption and decryption?", options: ["Asymmetric encryption", "Symmetric encryption", "Hashing", "PKI"], answer: 1 },
    { question: "What is the primary function of a firewall in network security?", options: ["Detect malware", "Block unauthorized access", "Encrypt data", "Speed up connection"], answer: 1 },
    { question: "What type of AI focuses on making machines think and behave like humans?", options: ["Neural Networks", "Machine Learning", "Strong AI", "Weak AI"], answer: 2 },
    { question: "Which of the following is not one of the three main types of machine learning?", options: ["Supervised Learning", "Reinforcement Learning", "Unsupervised Learning", "Distributive Programming"], answer: 3 },
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
    { question: "What is the purpose of Jenkins?", options: ["JavaScript enhancement", "Continuous integration server", "Job scheduling", "Java extension management"], answer: 1 },
    
    // Adding 10 more computer science questions for Pakistan entry tests
    { question: "Which sorting algorithm has the worst-case time complexity of O(n²)?", options: ["Merge Sort", "Heap Sort", "Bubble Sort", "Quick Sort"], answer: 2 },
    { question: "In which year was the first computer virus created?", options: ["1971", "1983", "1986", "1990"], answer: 0 },
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], answer: 0 },
    { question: "What is the full form of DBMS?", options: ["Data Backup Management System", "Database Management System", "Data Block Management System", "Digital Backup Management Software"], answer: 1 },
    { question: "Which of the following is NOT a primary component of Von Neumann architecture?", options: ["Control Unit", "ALU", "Internet Interface", "Memory Unit"], answer: 2 },
    { question: "Which gate is known as the universal gate?", options: ["OR", "AND", "NAND", "XOR"], answer: 2 },
    { question: "Which of the following is a valid IPv4 address?", options: ["192.168.300.1", "127.0.0.0.1", "192.168.1.1", "256.256.256.256"], answer: 2 },
    { question: "The complexity of Binary Search Algorithm is:", options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"], answer: 1 },
    { question: "What is the Unicode value of 'A'?", options: ["65", "97", "48", "32"], answer: 0 },
    { question: "Which language is primarily used in Android app development?", options: ["Java", "Swift", "C#", "Ruby"], answer: 0 },
    
    // Final 10 questions specifically for Mehran University entry tests
    { question: "Which data structure is used for implementing recursion?", options: ["Queue", "Stack", "Array", "Linked List"], answer: 1 },
    { question: "What is the purpose of the 'volatile' keyword in C programming?", options: ["Indicates the variable can be changed by external factors", "Makes the variable read-only", "Increases variable access speed", "Allocates the variable in ROM"], answer: 0 },
    { question: "Which protocol is used to convert domain names to IP addresses?", options: ["HTTP", "FTP", "DNS", "SMTP"], answer: 2 },
    { question: "Which of the following is a lossless image compression format?", options: ["JPEG", "PNG", "GIF", "BMP"], answer: 1 },
    { question: "What is the full form of SDLC?", options: ["System Design Life Cycle", "Software Development Life Cycle", "System Development Logic Control", "Software Design Logic Cycle"], answer: 1 },
    { question: "Which number system is used in digital electronics?", options: ["Decimal", "Binary", "Hexadecimal", "Octal"], answer: 1 },
    { question: "What is the purpose of an accumulator in a CPU?", options: ["To store memory addresses", "To store intermediate arithmetic and logic results", "To control program flow", "To decode instructions"], answer: 1 },
    { question: "Which of the following is an example of an interpreted language?", options: ["C", "C++", "Python", "Pascal"], answer: 2 },
    { question: "What is the maximum number of IP addresses possible in IPv4?", options: ["2^16", "2^24", "2^32", "2^64"], answer: 2 },
    { question: "Which logic gate produces an output of 1 when all inputs are 0?", options: ["AND", "OR", "NOT", "NOR"], answer: 3 }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const popup = document.getElementById('popup');
    const mcqSection = document.getElementById('mcqSection');

    // Add theme toggle button to the header
    const header = document.querySelector('.header');
    if (header) {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = `
            <button id="themeToggleBtn">
                <i class="fas fa-moon"></i>
            </button>
        `;
        header.appendChild(themeToggle);
        
        // Initialize theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.getElementById('themeToggleBtn').innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Add event listener for theme toggle
        document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
    }

    // Reset answers when starting a new session
    if (!testProgress || !testProgress.started) {
        userAnswers = {};
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    }

    // Check if a test has already been completed from this device
    const previousTests = JSON.parse(localStorage.getItem('previousTests')) || [];
    
    // Get user identifier from stored data or generate a new one
    const userIdentifier = localStorage.getItem('userIdentifier') || 
                           Date.now().toString() + Math.random().toString(36).substr(2, 5);
    localStorage.setItem('userIdentifier', userIdentifier);
    
    

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
            
            // Reset question index and answers when starting a new test
            currentQuestionIndex = 0;
            userAnswers = {};
            localStorage.setItem('currentQuestion', currentQuestionIndex);
            localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
            
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

// Toggle between light and dark theme
function toggleTheme() {
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Play theme toggle sound
    playSound('theme');
}

// Show the instructions popup
function showInstructionsPopup() {
    // Create instructions popup element
    const instructionsPopup = document.createElement('div');
    instructionsPopup.className = 'instructions-popup';
    instructionsPopup.innerHTML = `
        <div class="instructions-content">
            <h2><i class="fas fa-info-circle"></i> Important Instructions</h2>
            <hr>
            <div class="instructions-scroll">
                <p><strong>Time Limit:</strong> You have 1 Hour to complete this test.</p>
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
            </div>
            <button id="startTestBtn" class="start-test-btn">I Understand, Start Test</button>
        </div>
    `;
    
    // Add the instructions popup to the body
    document.body.appendChild(instructionsPopup);
    
    // Ensure the popup is fully visible on mobile
    setTimeout(() => {
        const startBtn = document.getElementById('startTestBtn');
        if (startBtn) {
            // Make sure button is visible in viewport
            startBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 300);
    
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
    
    // Visual feedback without sound
    const isCorrect = optionIndex === mcqs[questionIndex].answer;
    const selectedOption = document.querySelector(`.option-item[data-option="${optionIndex}"]`);
    
    if (selectedOption) {
        // Apply temporary highlight class based on correct/incorrect
        if (isCorrect) {
            selectedOption.classList.add('correct-answer');
            // No sound
        } else {
            selectedOption.classList.add('wrong-answer');
            // No sound
        }
        
        // Show brief feedback message
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `answer-feedback ${isCorrect ? 'correct' : 'wrong'}`;
        feedbackDiv.innerHTML = isCorrect ? 
            '<i class="fas fa-check-circle"></i> Correct!' : 
            '<i class="fas fa-times-circle"></i> Incorrect';
        
        // Insert feedback after options
        const optionsContainer = document.querySelector('.options-container');
        if (optionsContainer && !optionsContainer.querySelector('.answer-feedback')) {
            optionsContainer.appendChild(feedbackDiv);
            
            // Animate feedback entrance
            setTimeout(() => {
                feedbackDiv.classList.add('show-feedback');
            }, 50);
        }
    }
    
    // After selecting an option, automatically go to next question after a short delay
    setTimeout(() => {
        if (questionIndex < mcqs.length - 1) {
            currentQuestionIndex = questionIndex + 1;
            localStorage.setItem('currentQuestion', currentQuestionIndex);
            loadQuestion(currentQuestionIndex);
        } else {
            showSubmitButton();
        }
    }, 1200); // Increase delay to show feedback
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
        // Always hide the next button - user will navigate by selecting answers only
        nextBtn.classList.add('hidden');
        
        // Only show submit button on last question
        if (currentQuestionIndex === mcqs.length - 1) {
            submitBtn.classList.remove('hidden');
        } else {
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
    const correctAnswers = calculateCorrectAnswers(userAnswers);
    const wrongAnswers = Object.keys(userAnswers).length - correctAnswers;
    const skippedQuestions = mcqs.length - Object.keys(userAnswers).length;
    
    const results = {
        userData: userData,
        score: score,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        skippedQuestions: skippedQuestions,
        totalQuestions: mcqs.length,
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
    
    // Store this test data to track attempts
    const previousTests = JSON.parse(localStorage.getItem('previousTests')) || [];
    const userIdentifier = localStorage.getItem('userIdentifier');
    
    previousTests.push({
        name: results.userData.name,
        phoneNumber: results.userData.phoneNumber,
        city: results.userData.city,
        identifier: userIdentifier,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('previousTests', JSON.stringify(previousTests));
    
    // Hide MCQ section and show results
    const mcqSection = document.getElementById('mcqSection');
    
    if (mcqSection) mcqSection.classList.add('hidden');
    
    // Create and display results with animations
    displayResults(results);
    
    // Send results to admin email
    sendResultsEmail(results);
}

// Display results with animations
function displayResults(results) {
    const resultsHTML = `
    <div id="resultsPopup" class="results-popup">
        <div class="results-content">
            <div class="results-header">
                <h1>Congratulations!</h1>
                <h2>${results.userData.name}</h2>
                <div class="celebration-icon">
                    <i class="fas fa-award"></i>
                </div>
            </div>
            
            <div class="results-details" id="certificate-content">
                <div class="certificate-header">
                    <div class="certificate-title">
                        <h3>Certificate of Completion</h3>
                        <p>This certifies that</p>
                        <h4>${results.userData.name}</h4>
                        <p>has successfully completed the MCQ test with a score of</p>
                        <div class="certificate-score">${results.score}%</div>
                    </div>
                </div>
                
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-value">${results.score}%</span>
                    </div>
                </div>
                
                <div class="stats-container">
                    <div class="stat-item correct">
                        <div class="stat-value">${results.correctAnswers}</div>
                        <div class="stat-label">Correct</div>
                    </div>
                    <div class="stat-item wrong">
                        <div class="stat-value">${results.wrongAnswers}</div>
                        <div class="stat-label">Wrong</div>
                    </div>
                    <div class="stat-item skipped">
                        <div class="stat-value">${results.skippedQuestions}</div>
                        <div class="stat-label">Skipped</div>
                    </div>
                </div>
                
                <div class="user-details">
                    <p><strong>Name:</strong> ${results.userData.name}</p>
                    <p><strong>Phone:</strong> ${results.userData.phoneNumber}</p>
                    <p><strong>City:</strong> ${results.userData.city}</p>
                    <p><strong>Age:</strong> ${results.userData.age}</p>
                    <p><strong>Favorite Subject:</strong> ${results.userData.favoriteSubject}</p>
                    <p><strong>Test Completed:</strong> ${new Date().toLocaleString()}</p>
                </div>
                
                <div class="certificate-footer">
                    <p>Date: ${new Date().toLocaleDateString()}</p>
                    <div class="certificate-stamp">
                        <i class="fas fa-certificate"></i>
                    </div>
                </div>
            </div>
            
            <div class="action-buttons">
                <button id="screenshotBtn" class="screenshot-btn">
                    <i class="fas fa-camera"></i> Take Screenshot
                </button>
                <button id="closeResultsBtn" class="close-results-btn">Close Results</button>
            </div>
            
            <div class="confetti-container" id="confetti-container"></div>
        </div>
    </div>`;
    
    // Add to document
    document.body.insertAdjacentHTML('beforeend', resultsHTML);
    
    // Trigger animations
    setTimeout(() => {
        document.getElementById('resultsPopup').classList.add('show-results');
        createConfetti();
        
        // Set score percentage for the circle animation
        const scoreCircle = document.querySelector('.score-circle');
        if (scoreCircle) {
            scoreCircle.style.setProperty('--score-percent', `${results.score}%`);
        }
        
        // Add screenshot button functionality
        document.getElementById('screenshotBtn').addEventListener('click', function() {
            takeScreenshot();
        });
        
        // Add close button functionality
        document.getElementById('closeResultsBtn').addEventListener('click', function() {
            // Show confirmation
            if (confirm("Are you sure you want to close the results? You won't be able to see them again.")) {
                document.getElementById('resultsPopup').remove();
                
                // Show completed message
                document.body.innerHTML = `
                    <div class="already-completed">
                        <div class="already-completed-content">
                            <i class="fas fa-check-circle"></i>
                            <h1>Test Successfully Completed</h1>
                            <p>Thank you for taking the test.</p>
                            <p>Your results have been recorded.</p>
                            <p>You have used 1 of your ${MAX_TEST_ATTEMPTS} allowed attempts.</p>
                            <button onclick="window.location.reload()" class="restart-btn">Return to Home</button>
                        </div>
                    </div>
                `;
            }
        });
    }, 300);
}

// Take screenshot function
function takeScreenshot() {
    // Create a modal with loading indicator
    const modal = document.createElement('div');
    modal.className = 'screenshot-modal';
    modal.innerHTML = `
        <div class="screenshot-loading">
            <div class="spinner"></div>
            <p>Creating your certificate...</p>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Load html2canvas dynamically
    const script = document.createElement('script');
    script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
    script.onload = function() {
        // Once the script is loaded, prepare a dedicated certificate for screenshot
        prepareCertificateForScreenshot();
    };
    
    script.onerror = function() {
        modal.innerHTML = `
            <div class="screenshot-error">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Error Loading Screenshot Tool</h3>
                <p>Could not load the screenshot tool. Please try again later.</p>
                <button id="errorCloseBtn" class="cancel-btn">Close</button>
            </div>
        `;
        document.getElementById('errorCloseBtn').addEventListener('click', function() {
            modal.remove();
        });
    };
    
    document.body.appendChild(script);
    
    function prepareCertificateForScreenshot() {
        // Get user data and score
        const resultsData = JSON.parse(localStorage.getItem('testResults'));
        if (!resultsData) {
            modal.innerHTML = `
                <div class="screenshot-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Error Creating Certificate</h3>
                    <p>Could not find test result data.</p>
                    <button id="errorCloseBtn" class="cancel-btn">Close</button>
                </div>
            `;
            document.getElementById('errorCloseBtn').addEventListener('click', function() {
                modal.remove();
            });
            return;
        }
        
        // Create a dedicated container for the certificate screenshot
        const screenshotContainer = document.createElement('div');
        screenshotContainer.id = 'certificate-screenshot-container';
        screenshotContainer.style.position = 'absolute';
        screenshotContainer.style.left = '-9999px';
        screenshotContainer.style.top = '0';
        screenshotContainer.style.width = '800px';
        document.body.appendChild(screenshotContainer);
        
        // Create certificate with clean layout for screenshot
        screenshotContainer.innerHTML = `
            <div class="certificate-screenshot">
                <h2 class="certificate-title">Certificate of Completion</h2>
                <p>This certifies that</p>
                <h3 class="user-name">${resultsData.userData.name}</h3>
                <p>has successfully completed the MCQ test with a score of</p>
                <div class="certificate-score">${resultsData.score}%</div>
                
                <div class="certificate-details">
                    <div class="cert-detail">
                        <span class="detail-label">Correct Answers:</span>
                        <span class="detail-value">${resultsData.correctAnswers}</span>
                    </div>
                    <div class="cert-detail">
                        <span class="detail-label">Wrong Answers:</span>
                        <span class="detail-value">${resultsData.wrongAnswers}</span>
                    </div>
                    <div class="cert-detail">
                        <span class="detail-label">Skipped Questions:</span>
                        <span class="detail-value">${resultsData.skippedQuestions}</span>
                    </div>
                    <div class="cert-detail">
                        <span class="detail-label">Total Questions:</span>
                        <span class="detail-value">${resultsData.totalQuestions}</span>
                    </div>
                </div>
                
                <div class="certificate-user-info">
                    <div><strong>Name:</strong> ${resultsData.userData.name}</div>
                    <div><strong>Phone:</strong> ${resultsData.userData.phoneNumber}</div>
                    <div><strong>City:</strong> ${resultsData.userData.city}</div>
                </div>
                
                <div class="certificate-footer">
                    <div class="date">Date: ${new Date().toLocaleDateString()}</div>
                    <div class="certificate-stamp">
                        <i class="fas fa-certificate"></i>
                    </div>
                </div>
            </div>
        `;
        
        // Add temporary styling to the certificate
        const style = document.createElement('style');
        style.id = 'certificate-screenshot-style';
        style.textContent = `
            .certificate-screenshot {
                background-color: #121212;
                color: white;
                padding: 40px;
                text-align: center;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.3);
                position: relative;
                font-family: 'Poppins', sans-serif;
            }
            .certificate-screenshot:before {
                content: '';
                position: absolute;
                top: 10px;
                right: 10px;
                bottom: 10px;
                left: 10px;
                border: 2px solid #555;
                border-radius: 5px;
                pointer-events: none;
            }
            .certificate-screenshot .certificate-title {
                color: #2196F3;
                font-size: 30px;
                margin-bottom: 20px;
            }
            .certificate-screenshot p {
                margin: 10px 0;
                font-size: 18px;
            }
            .certificate-screenshot .user-name {
                font-size: 36px;
                margin: 15px 0;
                color: white;
                text-transform: uppercase;
            }
            .certificate-screenshot .certificate-score {
                font-size: 42px;
                font-weight: bold;
                color: #4CAF50;
                margin: 20px 0;
            }
            .certificate-screenshot .certificate-details {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                margin: 30px 0;
                background-color: rgba(255,255,255,0.05);
                padding: 20px;
                border-radius: 8px;
            }
            .certificate-screenshot .cert-detail {
                text-align: center;
                padding: 10px 15px;
                border-radius: 5px;
                min-width: 150px;
            }
            .certificate-screenshot .detail-label {
                display: block;
                font-size: 14px;
                margin-bottom: 5px;
                opacity: 0.8;
            }
            .certificate-screenshot .detail-value {
                display: block;
                font-size: 24px;
                font-weight: bold;
            }
            .certificate-screenshot .certificate-user-info {
                text-align: left;
                margin: 30px 0;
                font-size: 16px;
                background-color: rgba(255,255,255,0.05);
                padding: 15px;
                border-radius: 8px;
            }
            .certificate-screenshot .certificate-user-info div {
                margin: 8px 0;
            }
            .certificate-screenshot .certificate-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 30px;
                border-top: 1px solid #555;
                padding-top: 20px;
            }
            .certificate-screenshot .date {
                font-size: 16px;
            }
            .certificate-screenshot .certificate-stamp {
                font-size: 48px;
                color: #FFC107;
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
        
        // Use html2canvas to create screenshot
        setTimeout(() => {
            html2canvas(screenshotContainer.querySelector('.certificate-screenshot'), {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#121212',
                logging: false
            }).then(canvas => {
                // Clean up the temporary elements
                screenshotContainer.remove();
                document.getElementById('certificate-screenshot-style').remove();
                
                // Convert canvas to image
                const image = canvas.toDataURL('image/png');
                
                // Create link to download image
                const link = document.createElement('a');
                link.download = `${resultsData.userData.name}-Certificate.png`;
                link.href = image;
                
                // Update modal content
                modal.innerHTML = `
                    <div class="screenshot-preview">
                        <h3>Your Certificate</h3>
                        <img src="${image}" alt="Certificate" class="certificate-image">
                        <div class="screenshot-actions">
                            <button id="downloadBtn" class="download-btn">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button id="cancelBtn" class="cancel-btn">
                                <i class="fas fa-times"></i> Close
                            </button>
                        </div>
                    </div>
                `;
                
                // Add event listeners to new buttons
                document.getElementById('downloadBtn').addEventListener('click', function() {
                    link.click();
                    playSound('theme');
                });
                
                document.getElementById('cancelBtn').addEventListener('click', function() {
                    modal.remove();
                });
                
                // Play success sound
                playSound('theme');
                
            }).catch(err => {
                console.error('Screenshot error:', err);
                modal.innerHTML = `
                    <div class="screenshot-error">
                        <i class="fas fa-exclamation-circle"></i>
                        <h3>Error Creating Screenshot</h3>
                        <p>There was a problem creating your certificate.</p>
                        <button id="errorCloseBtn" class="cancel-btn">Close</button>
                    </div>
                `;
                document.getElementById('errorCloseBtn').addEventListener('click', function() {
                    modal.remove();
                });
            });
        }, 500);
    }
}

// Play sound effects
function playSound(type) {
    // Only play sound for theme toggle
    if (type !== 'theme') return;
    
    // Cool sound for theme toggle
    const themeSound = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
    
    const audio = new Audio(themeSound);
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Audio play error:', err));
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    
    // Create confetti elements
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = ['#f44336', '#2196f3', '#ffeb3b', '#4caf50', '#9c27b0'][Math.floor(Math.random() * 5)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.background = color;
        
        // Random position
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        confetti.style.animationDuration = `${Math.random() * 5 + 5}s`;
        
        confettiContainer.appendChild(confetti);
    }
}

// Send results to admin via email
function sendResultsEmail(results) {
    if (resultsSent) return; // Prevent multiple submissions
    
    resultsSent = true;
    
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
    form.target = '_blank'; // Open in new tab to prevent redirect
    
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
    
    // Add redirect back to current page
    addField('_next', window.location.href);
    
    // Add the form to the document and submit it
    document.body.appendChild(form);
    
    // Create a background iframe to send the form without redirecting
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Set form target to the iframe
    form.target = 'hidden_iframe';
    
    // Submit the form after a delay to ensure all animations are visible
    setTimeout(() => {
        try {
            form.submit();
        } catch (e) {
            console.error('Form submission error:', e);
        }
    }, 2000);
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