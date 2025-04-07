// Plant Database
const plantDatabase = [
    {
        name: 'Aloe Vera',
        image: 'aloe_vera.jpg',  // The image filename
        description: 'Aloe Vera is a succulent plant species of the genus Aloe. It has medicinal properties, especially for skin and burns.',
        benefits: '1. Soothes skin burns. 2. Hydrates skin. 3. Boosts digestion.',
        growingSteps: '1. Needs bright, indirect sunlight. 2. Water when the soil is dry. 3. Prefers well-drained soil.'
    },
    {
        name: 'Tulsi',
        image: 'tulsi.jpg',
        description: 'Tulsi (Holy Basil) is a fragrant plant often used in Ayurvedic medicine. Known for its healing properties.',
        benefits: '1. Boosts immunity. 2. Helps in stress relief. 3. Purifies air.',
        growingSteps: '1. Thrives in warm, sunny climates. 2. Water regularly but avoid over-watering. 3. Prefers well-drained soil.'
    },
    // Add more plants here...
];

// Event listener for scanning the plant
document.getElementById('scan-btn').addEventListener('click', function () {
    const fileInput = document.getElementById('plant-image');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please upload an image of a plant.');
        return;
    }

    // Get the file name (without extension) to match with the database
    const fileName = file.name.split('.')[0].toLowerCase();

    // Check if the uploaded file name matches any plant in the database
    const plant = plantDatabase.find(p => p.image.split('.')[0].toLowerCase() === fileName);

    if (plant) {
        // Display plant info
        document.getElementById('plant-name').innerText = plant.name;
        document.getElementById('plant-description').innerText = plant.description;
        document.getElementById('plant-benefits').innerText = plant.benefits;
        document.getElementById('plant-growing-steps').innerText = plant.growingSteps;

        // Show the info container
        document.getElementById('plant-info').style.display = 'block';
    } else {
        alert('Sorry, we could not identify this plant.');
    }
});
