 document.addEventListener("DOMContentLoaded", function() {
  // Theme Toggle
  const themeBtn = document.getElementById('themeBtn');
  themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    updateThemeButton();
  });

  function updateThemeButton() {
    themeBtn.innerHTML = document.body.classList.contains('light-mode') 
      ? '<i class="fas fa-sun"></i> Light Mode' 
      : '<i class="fas fa-moon"></i> Dark Mode';
  }

  // Check saved theme
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }
  updateThemeButton();

  // Working Hours Indicator
  function updateWorkingHours() {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const statusElement = document.getElementById('workingHoursStatus');
    
    // Business hours: Mon-Fri 9AM-5PM
    const isWorkingHours = (day >= 1 && day <= 5) && (hours >= 9 && hours < 17);
    
    if (isWorkingHours) {
      statusElement.innerHTML = '<i class="far fa-clock"></i> <strong>Available Now:</strong> Open (9AM-5PM, Mon-Fri)';
      statusElement.style.backgroundColor = 'rgba(69, 255, 202, 0.1)';
      statusElement.style.color = '#45ffca';
    } else {
      statusElement.innerHTML = '<i class="far fa-clock"></i> <strong>Currently Closed:</strong> Open Monday-Friday, 9AM-5PM';
      statusElement.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
      statusElement.style.color = '#ff6b6b';
    }
  }
  
  // Initialize working hours check
  updateWorkingHours();
  setInterval(updateWorkingHours, 60000); // Update every minute

  // Form Submission
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-contact');
    const loading = document.getElementById('loading');
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    // Show loading state
    submitBtn.disabled = true;
    loading.style.display = 'block';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    
    // Submit form data
    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        successMsg.style.display = 'block';
        contactForm.reset();
        // Scroll to success message
        setTimeout(() => {
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      errorMsg.style.display = 'block';
      // Scroll to error message
      setTimeout(() => {
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    })
    .finally(() => {
      loading.style.display = 'none';
      submitBtn.disabled = false;
    });
  });

  // Input Validation
  const emailField = contactForm.querySelector("input[name='email']");
  const nameField = contactForm.querySelector("input[name='name']");

  emailField.addEventListener("input", function() {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value);
    emailField.style.borderColor = isValid ? "#45ffca" : "#ff6b6b";
  });

  nameField.addEventListener("input", function() {
    nameField.style.borderColor = nameField.value.trim() ? "#45ffca" : "#ff6b6b";
  });

  // Button hover effect
  const sendBtn = document.querySelector('.btn-contact');
  sendBtn.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.send-icon');
    icon.style.opacity = '1';
    icon.style.right = '25px';
    this.style.transform = 'translateY(-2px)';
  });
  
  sendBtn.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.send-icon');
    icon.style.opacity = '0';
    icon.style.right = '20px';
    this.style.transform = 'translateY(0)';
  });
});