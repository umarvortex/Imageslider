document.addEventListener('DOMContentLoaded', function() {
    // Form validation and submission
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const education = document.getElementById('education').value.trim();
            const city = document.getElementById('city').value.trim();
            const address = document.getElementById('address').value.trim();
            const gender = document.getElementById('gender').value;
            const module = document.getElementById('modules').value;
            
            // Simple validation
            if (!name || !email || !phone || !education || !city || !address || !gender || !module) {
                showAlert('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Phone validation
            if (!isValidPhone(phone)) {
                showAlert('Please enter a valid phone number', 'error');
                return;
            }
            
            // If all validations pass, simulate form submission
            const formData = {
                name,
                email,
                phone,
                education,
                city,
                address,
                gender,
                module
            };
            
            // Simulate API call
            setTimeout(() => {
                console.log('Form data:', formData);
                showAlert('Registration successful! You will receive a WhatsApp message shortly.', 'success');
                form.reset();
                
                // Show WhatsApp info box
                showWhatsAppInfo();
            }, 1500);
            
            // Show loading spinner
            showLoadingSpinner();
        });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Module selection enhancement
    const moduleSelect = document.getElementById('modules');
    if (moduleSelect) {
        moduleSelect.addEventListener('change', function() {
            const selectedModule = this.value;
            if (selectedModule) {
                const moduleNumber = selectedModule.replace('module', '');
                const moduleInfo = document.querySelector(`.module-item:nth-child(${moduleNumber})`);
                
                if (moduleInfo) {
                    moduleInfo.classList.add('selected-module');
                    setTimeout(() => {
                        moduleInfo.classList.remove('selected-module');
                    }, 2000);
                }
            }
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function isValidPhone(phone) {
        const regex = /^\+?[0-9]{10,15}$/;
        return regex.test(phone);
    }
    
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Create alert element
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${type}`;
        alertElement.textContent = message;
        
        // Add to DOM
        const formContainer = document.querySelector('.registration-form');
        formContainer.insertBefore(alertElement, formContainer.firstChild);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            alertElement.remove();
        }, 4000);
    }
    
    function showLoadingSpinner() {
        // Create spinner element
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        
        // Add spinner to form
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '';
        submitBtn.appendChild(spinner);
        submitBtn.disabled = true;
        
        // Remove spinner after 1.5 seconds
        setTimeout(() => {
            submitBtn.removeChild(spinner);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
    
    function showWhatsAppInfo() {
        // Create WhatsApp info popup
        const whatsappPopup = document.createElement('div');
        whatsappPopup.className = 'whatsapp-popup';
        whatsappPopup.innerHTML = `
            <div class="whatsapp-popup-content">
                <span class="close-popup">&times;</span>
                <h3>WhatsApp Group Information</h3>
                <p>Thank you for registering! Please join our WhatsApp group for course updates:</p>
                <p class="whatsapp-link">https://chat.whatsapp.com/example-group-link</p>
                <p>Contact us at: +92-000-0000000</p>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(whatsappPopup);
        
        // Close popup functionality
        const closePopup = whatsappPopup.querySelector('.close-popup');
        closePopup.addEventListener('click', () => {
            whatsappPopup.remove();
        });
        
        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (document.body.contains(whatsappPopup)) {
                whatsappPopup.remove();
            }
        }, 15000);
    }
    
    // Add CSS for dynamic elements
    addDynamicStyles();
    
    function addDynamicStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .alert {
                padding: 10px 15px;
                margin-bottom: 15px;
                border-radius: 4px;
                font-weight: bold;
            }
            
            .alert-success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .alert-error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            .spinner {
                width: 20px;
                height: 20px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s ease infinite;
                display: inline-block;
                vertical-align: middle;
                margin-right: 5px;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .whatsapp-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .whatsapp-popup-content {
                background-color: white;
                padding: 25px;
                border-radius: 8px;
                max-width: 400px;
                width: 90%;
                position: relative;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            
            .close-popup {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
                color: #777;
            }
            
            .whatsapp-link {
                background-color: #e8f5e9;
                padding: 10px;
                border-radius: 4px;
                word-break: break-all;
                margin: 15px 0;
                font-weight: bold;
                color: #1da462;
            }
            
            .selected-module {
                animation: highlight 2s ease;
            }
            
            @keyframes highlight {
                0% { background-color: white; }
                50% { background-color: #e8f5e9; }
                100% { background-color: white; }
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    // Add additional features and enhancements
    addFeatureEnhancements();
    
    function addFeatureEnhancements() {
        // Add module filter functionality
        const filterContainer = document.createElement('div');
        filterContainer.className = 'module-filter';
        filterContainer.innerHTML = `
            <label>Filter Modules: </label>
            <select id="moduleFilter">
                <option value="all">All Modules</option>
                <option value="technical">Technical</option>
                <option value="business">Business</option>
                <option value="design">Design</option>
            </select>
        `;
        
        const modulesSection = document.querySelector('.modules');
        if (modulesSection) {
            modulesSection.insertBefore(filterContainer, modulesSection.firstChild);
            
            // Add filter functionality
            const filterSelect = document.getElementById('moduleFilter');
            if (filterSelect) {
                filterSelect.addEventListener('change', function() {
                    const filter = this.value;
                    const moduleItems = document.querySelectorAll('.module-item');
                    
                    moduleItems.forEach(item => {
                        const title = item.querySelector('h3').textContent.toLowerCase();
                        
                        if (filter === 'all') {
                            item.style.display = 'block';
                        } else if (filter === 'technical' && (title.includes('e-commerce') || title.includes('setup') || title.includes('management'))) {
                            item.style.display = 'block';
                        } else if (filter === 'business' && (title.includes('research') || title.includes('marketing') || title.includes('payment'))) {
                            item.style.display = 'block';
                        } else if (filter === 'design' && (title.includes('design') || title.includes('branding'))) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            }
        }
        
        // Add module search functionality
        const searchContainer = document.createElement('div');
        searchContainer.className = 'module-search';
        searchContainer.innerHTML = `
            <input type="text" id="moduleSearch" placeholder="Search modules...">
        `;
        
        if (modulesSection) {
            modulesSection.insertBefore(searchContainer, filterContainer.nextSibling);
            
            // Add search functionality
            const searchInput = document.getElementById('moduleSearch');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    const moduleItems = document.querySelectorAll('.module-item');
                    
                    moduleItems.forEach(item => {
                        const content = item.textContent.toLowerCase();
                        if (content.includes(searchTerm)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            }
        }
    }
}); 