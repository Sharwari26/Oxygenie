document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const uploadPreview = document.getElementById('uploadPreview');
    const fileInput = document.getElementById('plantImage');
    const scanButton = document.getElementById('scanButton');
    const scanForm = document.getElementById('scanForm');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // Handle click on upload area
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    // Handle drag and drop events
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function() {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    // Handle file selection
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length) {
            handleFileSelect(fileInput.files[0]);
        }
    });

    function handleFileSelect(file) {
        // Check file type
        if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
            alert('Please select a JPG or PNG image.');
            return;
        }

        // Check file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size exceeds 5MB. Please choose a smaller image.');
            return;
        }

        // Display preview
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadPreview.src = e.target.result;
            uploadPreview.classList.remove('d-none');
            uploadPrompt.classList.add('d-none');
            scanButton.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    // Handle form submission
    scanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading indicator
        loadingIndicator.classList.remove('d-none');
        scanButton.disabled = true;
        
        // Create form data
        const formData = new FormData();
        formData.append('plantImage', fileInput.files[0]);
        
        // Send to server
        fetch('php/scan_plant.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Redirect to results page with plant ID
            window.location.href = `result.html?plant=${encodeURIComponent(data.plant_name)}`;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Sorry, there was an error processing your image. Please try again.');
            loadingIndicator.classList.add('d-none');
            scanButton.disabled = false;
        });
    });
});