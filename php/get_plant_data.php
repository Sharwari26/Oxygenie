<?php
// Set headers for JSON response
header('Content-Type: application/json');

// Get plant name from URL parameter
$plantName = isset($_GET['plant']) ? $_GET['plant'] : '';

if (empty($plantName)) {
    http_response_code(400);
    echo json_encode(['error' => 'Plant name is required']);
    exit;
}

// For a production application, this data would come from a database
// For now, we'll use a hardcoded JSON file with plant data
$plantDataFile = '../ml_model/plant_info.json';

if (!file_exists($plantDataFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Plant database not found']);
    exit;
}

// Load plant data
$plantData = json_decode(file_get_contents($plantDataFile), true);

if (!$plantData) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load plant database']);
    exit;
}

// Find the requested plant
$foundPlant = null;
foreach ($plantData as $plant) {
    if (strtolower($plant['name']) === strtolower($plantName)) {
        $foundPlant = $plant;
        break;
    }
}

// If plant not found
if (!$foundPlant) {
    http_response_code(404);
    echo json_encode(['error' => 'Plant not found']);
    exit;
}

// Return plant data
echo json_encode($foundPlant);
exit;
?>