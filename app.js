// MCQs data - 100 university-related multiple choice questions
const mcqs = [
    { question: "What is the capital of Pakistan?", options: ["Karachi", "Lahore", "Islamabad", "Quetta"], answer: 2 },
    { question: "The binary equivalent of decimal number 10 is:", options: ["1010", "1000", "1001", "1100"], answer: 0 },
    { question: "Which of the following is not a data structure?", options: ["Array", "Linked List", "Tree", "Equation"], answer: 3 },
    { question: "Which protocol is used for secure web browsing?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], answer: 2 },
    { question: "The smallest unit of data in a computer is:", options: ["Byte", "Kilobyte", "Bit", "Megabyte"], answer: 2 },
    { question: "Which of the following is not a programming language?", options: ["Java", "Python", "C++", "Microsoft"], answer: 3 },
    { question: "HTML is used for:", options: ["Database", "Web Development", "Networking", "Graphics"], answer: 1 },
    { question: "Which of the following is a relational database?", options: ["MongoDB", "MySQL", "Firebase", "Redis"], answer: 1 },
    { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Process Utility", "Central Processor Utility"], answer: 0 },
    { question: "Which scientist is known for the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Stephen Hawking"], answer: 1 },
    { question: "Which planet is known as the Red Planet?", options: ["Jupiter", "Mars", "Venus", "Saturn"], answer: 1 },
    { question: "What is the chemical symbol for gold?", options: ["Go", "Gl", "Au", "Ag"], answer: 2 },
    { question: "Which is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: 3 },
    { question: "The study of stars and planets is called:", options: ["Biology", "Geology", "Astronomy", "Chemistry"], answer: 2 },
    { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: 1 },
    { question: "What is the chemical formula for water?", options: ["H2O", "CO2", "O2", "H2O2"], answer: 0 },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "South Korea", "Japan", "Thailand"], answer: 2 },
    { question: "Who wrote the play 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: 1 },
    { question: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Brain", "Skin"], answer: 3 },
    { question: "Which of these is not a primary color?", options: ["Red", "Blue", "Yellow", "Green"], answer: 3 },
    { question: "What is the square root of 144?", options: ["12", "14", "10", "16"], answer: 0 },
    { question: "What does DNA stand for?", options: ["Digital Network Access", "Deoxyribonucleic Acid", "Dynamic Network Algorithm", "Data Network Architecture"], answer: 1 },
    { question: "Which of these is a programming paradigm?", options: ["Python", "Java", "Object-Oriented", "Linux"], answer: 2 },
    { question: "The process of converting source code to machine code is called:", options: ["Interpreting", "Compiling", "Executing", "Debugging"], answer: 1 },
    { question: "What is the value of π (pi) to two decimal places?", options: ["3.14", "3.41", "3.12", "3.15"], answer: 0 },
    { question: "Which of these is not an operating system?", options: ["Windows", "macOS", "Linux", "Oracle"], answer: 3 },
    { question: "RAM stands for:", options: ["Random Access Memory", "Read Access Memory", "Random Accessible Memory", "Read Accessible Memory"], answer: 0 },
    { question: "What is the main function of an operating system?", options: ["Run Applications", "Manage Hardware Resources", "Provide User Interface", "All of the above"], answer: 3 },
    { question: "Which of these is a programming language used for artificial intelligence?", options: ["HTML", "CSS", "Python", "SQL"], answer: 2 },
    { question: "What does URL stand for?", options: ["Universal Resource Locator", "Uniform Resource Locator", "Universal Reference Locator", "Uniform Reference Link"], answer: 1 },
    { question: "The most commonly used LAN protocol is:", options: ["Ethernet", "Token Ring", "FDDI", "ATM"], answer: 0 },
    { question: "The most abundant gas in Earth's atmosphere is:", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 2 },
    { question: "Which of these is used to measure earthquake intensity?", options: ["Decibel Scale", "Richter Scale", "Kelvin Scale", "pH Scale"], answer: 1 },
    { question: "The capital of Saudi Arabia is:", options: ["Dubai", "Riyadh", "Jeddah", "Mecca"], answer: 1 },
    { question: "The distance light travels in one year is called:", options: ["Light Distance", "Light Year", "Light Speed", "Light Path"], answer: 1 },
    { question: "Which of these is a type of database model?", options: ["Hierarchical", "Horizontal", "Vertical", "Diagonal"], answer: 0 },
    { question: "Which of these is not a web browser?", options: ["Chrome", "Firefox", "Safari", "Oracle"], answer: 3 },
    { question: "Which of these is not a layer in OSI model?", options: ["Application", "Network", "Authentication", "Transport"], answer: 2 },
    { question: "In computer networking, what does LAN stand for?", options: ["Large Area Network", "Local Area Network", "Long Area Node", "Local Access Node"], answer: 1 },
    { question: "What does ISP stand for?", options: ["Internet Service Provider", "Internet Security Protocol", "Internal Service Port", "Internet Service Protocol"], answer: 0 },
    { question: "Which programming language is often used for web development?", options: ["C++", "JavaScript", "Swift", "Ruby"], answer: 1 },
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosomes", "Endoplasmic Reticulum"], answer: 1 },
    { question: "Which of these is a front-end framework?", options: ["Django", "Express", "React", "Flask"], answer: 2 },
    { question: "The process of finding errors in software code is called:", options: ["Debugging", "Compiling", "Testing", "Error Checking"], answer: 0 },
    { question: "What is the largest desert in the world?", options: ["Gobi Desert", "Sahara Desert", "Antarctic Desert", "Arabian Desert"], answer: 2 },
    { question: "What does CSS stand for in web development?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Coded Style System"], answer: 1 },
    { question: "The study of earthquakes is called:", options: ["Geology", "Seismology", "Oceanography", "Meteorology"], answer: 1 },
    { question: "Which of these is not a file extension for an image file?", options: [".jpg", ".png", ".gif", ".doc"], answer: 3 },
    { question: "The '404' error in web browsing indicates:", options: ["Server Error", "Page Not Found", "Connection Timeout", "Authentication Required"], answer: 1 },
    { question: "Which layer of the OSI model is responsible for routing?", options: ["Transport Layer", "Network Layer", "Data Link Layer", "Session Layer"], answer: 1 },
    { question: "What is the full form of API?", options: ["Application Programming Interface", "Application Process Integration", "Automated Programming Interface", "Application Protocol Interface"], answer: 0 },
    { question: "Which of these is not a cryptocurrency?", options: ["Bitcoin", "Ethereum", "Ripple", "JavaCoin"], answer: 3 },
    { question: "In which year was the first iPhone released?", options: ["2005", "2007", "2009", "2010"], answer: 1 },
    { question: "The 'Cloud' in Cloud Computing refers to:", options: ["Weather", "The Internet", "A Specific Server", "Microsoft's Product"], answer: 1 },
    { question: "Artificial Intelligence aims to make computers:", options: ["Faster", "More Secure", "Think Like Humans", "Less Expensive"], answer: 2 },
    { question: "Which of these is not a type of computer network?", options: ["LAN", "WAN", "MAN", "TAN"], answer: 3 },
    { question: "The search engine Google was founded in which year?", options: ["1996", "1998", "2000", "2002"], answer: 1 },
    { question: "SQL is used for:", options: ["Web Development", "Game Development", "Database Management", "Network Security"], answer: 2 },
    { question: "The outermost layer of the Earth is called:", options: ["Core", "Mantle", "Crust", "Lithosphere"], answer: 2 },
    { question: "Which of these is not one of the four fundamental forces of nature?", options: ["Gravity", "Electromagnetic Force", "Strong Nuclear Force", "Vibrational Force"], answer: 3 },
    { question: "In which year was Pakistan founded?", options: ["1945", "1947", "1950", "1952"], answer: 1 },
    { question: "The capital of Sindh province is:", options: ["Lahore", "Karachi", "Islamabad", "Peshawar"], answer: 1 },
    { question: "Which of these is the highest mountain peak in Pakistan?", options: ["K2", "Nanga Parbat", "Broad Peak", "Gasherbrum I"], answer: 0 },
    { question: "Which river is primarily associated with Sindh province?", options: ["Indus", "Jhelum", "Chenab", "Ravi"], answer: 0 },
    { question: "Which of these is not a data type in programming?", options: ["Integer", "String", "Float", "Command"], answer: 3 },
    { question: "What is the primary purpose of a firewall in computer networks?", options: ["Speed up internet connection", "Filter network traffic for security", "Enhance server performance", "Store data backups"], answer: 1 },
    { question: "Which of these is a markup language?", options: ["Java", "Python", "HTML", "C++"], answer: 2 },
    { question: "Which of these is the correct definition of an algorithm?", options: ["A programming language", "A step-by-step procedure to solve a problem", "A type of computer hardware", "A database system"], answer: 1 },
    { question: "What is the function of RAM in a computer?", options: ["Permanent storage", "Temporary storage", "Processing data", "Cooling the system"], answer: 1 },
    { question: "Which of these is not a valid email protocol?", options: ["POP3", "SMTP", "IMAP", "EHTTP"], answer: 3 },
    { question: "The process of converting analog signals to digital is called:", options: ["Modulation", "Digitization", "Encryption", "Compression"], answer: 1 },
    { question: "Which of the following is an example of a volatile memory?", options: ["Hard Disk", "CD-ROM", "RAM", "ROM"], answer: 2 },
    { question: "The decimal number 15 in binary is:", options: ["1101", "1111", "1011", "1001"], answer: 1 },
    { question: "Which of these is not a principle of object-oriented programming?", options: ["Inheritance", "Polymorphism", "Encapsulation", "Fragmentation"], answer: 3 },
    { question: "Which network device operates at the Data Link layer of the OSI model?", options: ["Router", "Switch", "Gateway", "Firewall"], answer: 1 },
    { question: "What is the function of a router in a network?", options: ["Connect multiple networks", "Boost network signal", "Store network data", "Filter malware"], answer: 0 },
    { question: "Which of these is not a valid HTTP response status code?", options: ["200", "404", "500", "600"], answer: 3 },
    { question: "Which of these is a characteristic of Big Data?", options: ["Small size", "Low variety", "High volume", "Slow processing"], answer: 2 },
    { question: "Which of these is not a cloud service model?", options: ["SaaS", "PaaS", "IaaS", "CaaS"], answer: 3 },
    { question: "The primary purpose of an index in a database is to:", options: ["Store data", "Improve search performance", "Create backup", "Connect tables"], answer: 1 },
    { question: "Which of these is not a type of NoSQL database?", options: ["Document", "Graph", "Relational", "Key-Value"], answer: 2 },
    { question: "In which year was Mehran University of Engineering and Technology founded?", options: ["1963", "1973", "1983", "1993"], answer: 1 },
    { question: "Which of these universities is located in Jamshoro?", options: ["Quaid-e-Azam University", "University of Karachi", "Mehran University", "LUMS"], answer: 2 },
    { question: "Which of these is a version control system?", options: ["MySQL", "MongoDB", "Git", "Apache"], answer: 2 },
    { question: "What is the primary function of a DNS server?", options: ["Store web pages", "Resolve domain names to IP addresses", "Process database queries", "Host email services"], answer: 1 },
    { question: "Which of these is not a valid IP address?", options: ["192.168.1.1", "256.256.256.256", "10.0.0.1", "172.16.0.1"], answer: 1 },
    { question: "What is the decimal value of hexadecimal 'A'?", options: ["8", "10", "12", "14"], answer: 1 },
    { question: "What is the name of the first fully supported 64-bit operating system for personal computers?", options: ["Windows XP", "Windows Vista", "Mac OS X", "Linux"], answer: 2 },
    { question: "Which of these is not a valid logical operator?", options: ["AND", "OR", "NOT", "IF"], answer: 3 },
    { question: "The main circuit board in a computer is called:", options: ["CPU", "RAM", "Motherboard", "Hard Drive"], answer: 2 },
    { question: "Which of these is not a valid file permission in Unix/Linux?", options: ["Read", "Write", "Execute", "Delete"], answer: 3 },
    { question: "Which of these is not a stage in the software development life cycle?", options: ["Requirements", "Design", "Implementation", "Fragmentation"], answer: 3 },
    { question: "What does UI stand for in computing?", options: ["Universal Interface", "User Interface", "Unified Integration", "User Integration"], answer: 1 },
    { question: "Which of these is not a type of computer malware?", options: ["Virus", "Worm", "Trojan Horse", "Firewall"], answer: 3 },
    { question: "Which of these is used for implementing machine learning algorithms?", options: ["Excel", "Word", "TensorFlow", "PowerPoint"], answer: 2 },
    { question: "What is the main function of BIOS in a computer?", options: ["Process data", "Run applications", "Connect to internet", "Initialize hardware during boot"], answer: 3 },
    { question: "Which of these is not a database management system?", options: ["MySQL", "Oracle", "SQL Server", "JavaScript"], answer: 3 },
    { question: "The use of biological patterns like fingerprints for identification is called:", options: ["Password Protection", "Biometrics", "Authentication", "Verification"], answer: 1 },
    { question: "Which of the following is not a characteristic of blockchain technology?", options: ["Decentralization", "Transparency", "Immutability", "Centralized control"], answer: 3 }
];

// Global variables
let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 90 * 60; // 1 hour 30 minutes in seconds
let timer;
let userName = "";
let userEmail = "";

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const userForm = document.getElementById('userForm');
    const popup = document.getElementById('popup');
    const mcqSection = document.getElementById('mcqSection');
    const resultsSection = document.getElementById('resultsSection');
    const timerElement = document.getElementById('timer');
    const progressBar = document.getElementById('progressBar');
    const questionIndicators = document.getElementById('questionIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    // Initialize question indicators
    initializeQuestionIndicators();

    // Form submission handler
    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        userName = document.getElementById('name').value;
        userEmail = document.getElementById('email').value;
        
        // In a real application, this would communicate with the server
        // For demo purposes, we'll simulate approval
        simulateApproval(userName, userEmail);
    });

    // Simulate server approval process
    function simulateApproval(name, email) {
        // Show loading or pending message
        alert(`Thank you, ${name}! Your details have been sent for approval. For this demo, you'll be approved automatically.`);
        
        // Simulate server delay and approval
        setTimeout(() => {
            popup.classList.add('hidden');
            mcqSection.classList.remove('hidden');
            startTimer();
            displayQuestion(currentQuestionIndex);
            updateProgressBar();
        }, 1000);
    }

    // Initialize question indicators
    function initializeQuestionIndicators() {
        const indicatorsHTML = mcqs.map((_, index) => {
            return `<div class="question-indicator" data-index="${index}" onclick="jumpToQuestion(${index})">${index + 1}</div>`;
        }).join('');
        
        questionIndicators.innerHTML = indicatorsHTML;
        
        // Add click event to question indicators
        document.querySelectorAll('.question-indicator').forEach(indicator => {
            indicator.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                jumpToQuestion(index);
            });
        });
    }

    // Timer function
    function startTimer() {
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                submitTest();
            } else {
                timeLeft--;
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;
                timerElement.textContent = `Time Left: ${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
        }, 1000);
    }

    // Display question
    function displayQuestion(index) {
        const mcqContainer = document.getElementById('mcqs');
        const currentQuestion = mcqs[index];
        
        // Create options HTML
        const optionsHTML = currentQuestion.options.map((option, optIndex) => {
            const isSelected = userAnswers[index] === optIndex;
            return `
                <div class="option-item ${isSelected ? 'selected' : ''}" onclick="selectOption(${index}, ${optIndex})">
                    <input type="radio" name="option" id="option${optIndex}" class="option-radio" ${isSelected ? 'checked' : ''}>
                    <label for="option${optIndex}">${option}</label>
                </div>
            `;
        }).join('');
        
        // Create question HTML
        mcqContainer.innerHTML = `
            <div class="question-header">
                <div class="question-number">Question ${index + 1} of ${mcqs.length}</div>
                <div class="question-text">${currentQuestion.question}</div>
            </div>
            <div class="options-container">
                ${optionsHTML}
            </div>
        `;
        
        // Add click event to options
        document.querySelectorAll('.option-item').forEach((option, optIndex) => {
            option.addEventListener('click', function() {
                selectOption(index, optIndex);
            });
        });
        
        // Update UI elements
        updateQuestionIndicators();
        updateNavigationButtons();
    }

    // Select an option
    window.selectOption = function(questionIndex, optionIndex) {
        userAnswers[questionIndex] = optionIndex;
        updateQuestionIndicators();
        displayQuestion(questionIndex);
    };

    // Navigation functions
    window.prevQuestion = function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
            updateProgressBar();
        }
    };

    window.nextQuestion = function() {
        if (currentQuestionIndex < mcqs.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
            updateProgressBar();
        } else {
            // Show submit button if on last question
            submitBtn.classList.remove('hidden');
            nextBtn.classList.add('hidden');
        }
    };

    window.jumpToQuestion = function(index) {
        currentQuestionIndex = index;
        displayQuestion(currentQuestionIndex);
        updateProgressBar();
        updateNavigationButtons();
    };

    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / mcqs.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Update question indicators
    function updateQuestionIndicators() {
        document.querySelectorAll('.question-indicator').forEach((indicator, index) => {
            // Remove all classes first
            indicator.classList.remove('active', 'answered');
            
            // Add appropriate classes
            if (index === currentQuestionIndex) {
                indicator.classList.add('active');
            }
            if (userAnswers[index] !== undefined) {
                indicator.classList.add('answered');
            }
        });
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        
        if (currentQuestionIndex === mcqs.length - 1) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }

    // Submit test
    window.submitTest = function() {
        clearInterval(timer);
        calculateResults();
    };

    // Calculate results
    function calculateResults() {
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let unansweredQuestions = 0;
        
        mcqs.forEach((mcq, index) => {
            if (userAnswers[index] === undefined) {
                unansweredQuestions++;
            } else if (userAnswers[index] === mcq.answer) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
        });
        
        const score = Math.round((correctAnswers / mcqs.length) * 100);
        
        // Display results
        mcqSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        
        document.getElementById('resultsSummary').innerHTML = `
            <h2>Test Completed!</h2>
            <div class="results-item">
                <span>Candidate Name:</span>
                <span>${userName}</span>
            </div>
            <div class="results-item">
                <span>Email:</span>
                <span>${userEmail}</span>
            </div>
            <div class="results-item">
                <span>Total Questions:</span>
                <span>${mcqs.length}</span>
            </div>
            <div class="results-item">
                <span>Correct Answers:</span>
                <span>${correctAnswers}</span>
            </div>
            <div class="results-item">
                <span>Wrong Answers:</span>
                <span>${wrongAnswers}</span>
            </div>
            <div class="results-item">
                <span>Unanswered Questions:</span>
                <span>${unansweredQuestions}</span>
            </div>
            <div class="result-score">Final Score: ${score}%</div>
        `;
        
        // Show certificate if score is good
        if (score >= 40) {
            showCertificate(userName, score);
        }
    }

    // Show certificate
    function showCertificate(name, score) {
        const certificateContainer = document.getElementById('certificateContainer');
        certificateContainer.classList.remove('hidden');
        
        document.getElementById('candidateName').textContent = name;
        document.getElementById('candidateScore').textContent = `${score}%`;
        
        const today = new Date();
        document.getElementById('certificateDate').textContent = today.toDateString();
    }
}); 