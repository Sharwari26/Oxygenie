document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const loadingElement = document.getElementById('loadingResults');
    const resultsContainer = document.getElementById('resultsContainer');
    const errorMessage = document.getElementById('errorMessage');
    const plantNameElement = document.getElementById('plantName');
    const plantImageElement = document.getElementById('plantImage');
    const plantCategoryElement = document.getElementById('plantCategory');
    const plantTypeElement = document.getElementById('plantType');
    const plantDescriptionElement = document.getElementById('plantDescription');
    const benefitsListElement = document.getElementById('benefitsList');
    const usageListElement = document.getElementById('usageList');
    const sunlightNeedsElement = document.getElementById('sunlightNeeds');
    const waterNeedsElement = document.getElementById('waterNeeds');
    const tempNeedsElement = document.getElementById('tempNeeds');
    const soilNeedsElement = document.getElementById('soilNeeds');
    const saveToFavoritesButton = document.getElementById('saveToFavorites');
    
    // Get plant name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const plantName = urlParams.get('plant');
    
    if (!plantName) {
        showError("No plant specified. Please scan a plant first.");
        return;
    }
    
    // Fetch plant data
    fetchPlantData(plantName);
    
    // Event listener for save to favorites button
    saveToFavoritesButton.addEventListener('click', function() {
        // Check if user is logged in
        const isLoggedIn = checkLoginStatus();
        
        if (isLoggedIn) {
            savePlantToFavorites(plantName);
        } else {
            // Redirect to login page
            sessionStorage.setItem('pendingSave', plantName);
            window.location.href = 'login.php?redirect=result.html&plant=' + encodeURIComponent(plantName);
        }
    });
    
    function fetchPlantData(plantName) {
        // Fetch from API
        fetch(`php/get_plant_data.php?plant=${encodeURIComponent(plantName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayPlantData(data);
                // Update search count in the background
                updateSearchCount(plantName);
            })
            .catch(error => {
                console.error('Error:', error);
                showError("Failed to load plant information. Please try again.");
            });
    }
    
    function displayPlantData(data) {
        // Set basic plant info
        plantNameElement.textContent = data.name;
        plantImageElement.src = data.image_url || 'images/placeholder.jpg';
        plantImageElement.alt = data.name;
        plantCategoryElement.textContent = data.category || 'Unknown';
        plantTypeElement.textContent = data.plant_type || 'Plant';
        plantDescriptionElement.textContent = data.description || 'No description available.';
        
        // Set care instructions
        sunlightNeedsElement.textContent = data.care.sunlight || 'Not specified';
        waterNeedsElement.textContent = data.care.water || 'Not specified';
        tempNeedsElement.textContent = data.care.temperature || 'Not specified';
        soilNeedsElement.textContent = data.care.soil || 'Not specified';
        
        // Populate benefits list
        benefitsListElement.innerHTML = '';
        if (data.benefits && data.benefits.length > 0) {
            data.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `<i class="bi bi-check-circle-fill text-success me-2"></i>${benefit}`;
                benefitsListElement.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = 'No specific benefits recorded.';
            benefitsListElement.appendChild(li);
        }
        
        // Populate usage list
        usageListElement.innerHTML = '';
        if (data.usage && data.usage.length > 0) {
            data.usage.forEach(use => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `<i class="bi bi-info-circle-fill text-primary me-2"></i>${use}`;
                usageListElement.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = 'No usage information available.';
            usageListElement.appendChild(li);
        }
        
        // Show results
        loadingElement.classList.add('d-none');
        resultsContainer.classList.remove('d-none');
    }
    
    function showError(message) {
        loadingElement.classList.add('d-none');
        resultsContainer.classList.add('d-none');
        errorMessage.classList.remove('d-none');
        errorMessage.querySelector('p').textContent = message;
    }
    
    function checkLoginStatus() {
        // This would typically check a session cookie or token
        // For this demo, we'll simulate not being logged in
        return false;
    }
    
    function savePlantToFavorites(plantName) {
        // This would save the plant to the user's favorites in the database
        // For now, we'll just show an alert
        alert(`${plantName} has been saved to your favorites!`);
        saveToFavoritesButton.innerHTML = '<i class="bi bi-bookmark-check-fill"></i> Saved to My Plants';
        saveToFavoritesButton.disabled = true;
    }
    
    function updateSearchCount(plantName) {
        // Send a request to update the search count for this plant
        fetch('php/update_search_count.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `plant=${encodeURIComponent(plantName)}`
        }).catch(error => {
            // Non-critical, so just log errors
            console.error('Error updating search count:', error);
        });
    }
});