<?php
// Include database configuration
require_once 'config.php';

// Check if plant name is provided
if (!isset($_POST['plant']) || empty($_POST['plant'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Plant name is required']);
    exit;
}

$plantName = $_POST['plant'];

// Sanitize input
$plantName = mysqli_real_escape_string($conn, $plantName);

// Check if plant already exists in search_counts table
$query = "SELECT plant_id, search_count FROM search_counts WHERE plant_name = '$plantName'";
$result = mysqli_query($conn, $query);

if ($result && mysqli_num_rows($result) > 0) {
    // Plant already exists, update count
    $row = mysqli_fetch_assoc($result);
    $plantId = $row['plant_id'];
    $newCount = $row['search_count'] + 1;
    
    $updateQuery = "UPDATE search_counts SET search_count = $newCount WHERE plant_id = $plantId";
    mysqli_query($conn, $updateQuery);
} else {
    // Plant doesn't exist, insert new record
    $insertQuery = "INSERT INTO search_counts (plant_name, search_count) VALUES ('$plantName', 1)";
    mysqli_query($conn, $insertQuery);
}

// Return success response
echo json_encode(['success' => true]);
?>