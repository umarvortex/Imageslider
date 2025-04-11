document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('uploadBtn');
    const imageUpload = document.getElementById('imageUpload');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const imageGallery = document.getElementById('imageGallery');
    
    // Reference to Firebase storage
    const storageRef = firebase.storage().ref();
    
    // Load all images when page loads
    loadImages();
    
    // Trigger file input when button is clicked
    uploadBtn.addEventListener('click', () => {
        imageUpload.click();
    });
    
    // Handle file selection
    imageUpload.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            uploadFiles(files);
        }
    });
    
    // Upload files to Firebase
    function uploadFiles(files) {
        progressContainer.style.display = 'block';
        let uploadedCount = 0;
        
        Array.from(files).forEach((file, index) => {
            // Create a unique filename
            const fileName = `${Date.now()}-${file.name}`;
            const uploadTask = storageRef.child(`images/${fileName}`).put(file);
            
            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Progress tracking
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progressBar.style.width = `${progress}%`;
                    progressText.textContent = `${Math.round(progress)}%`;
                },
                (error) => {
                    console.error("Upload error:", error);
                },
                () => {
                    // Upload complete
                    uploadedCount++;
                    if (uploadedCount === files.length) {
                        setTimeout(() => {
                            progressContainer.style.display = 'none';
                            progressBar.style.width = '0%';
                            progressText.textContent = '0%';
                            imageUpload.value = '';
                            loadImages(); // Refresh gallery
                        }, 1000);
                    }
                }
            );
        });
    }
    
    // Load all images from Firebase
    function loadImages() {
        imageGallery.innerHTML = '<div class="loading">Loading family memories...</div>';
        
        storageRef.child('images/').listAll().then((result) => {
            if (result.items.length === 0) {
                imageGallery.innerHTML = '<div class="loading">No photos yet. Be the first to upload!</div>';
                return;
            }
            
            imageGallery.innerHTML = '';
            
            result.items.forEach((imageRef) => {
                imageRef.getDownloadURL().then((url) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = url;
                    imgElement.alt = "Family photo";
                    imgElement.loading = "lazy";
                    imageGallery.appendChild(imgElement);
                });
            });
        }).catch((error) => {
            console.error("Error loading images:", error);
            imageGallery.innerHTML = '<div class="loading">Error loading photos. Please try again later.</div>';
        });
    }
});