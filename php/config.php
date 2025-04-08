<?php
// Database configuration
$db_host = 'localhost'; // Database host
$db_user = 'oxygenie_user'; // Database username
$db_pass = 'your_secure_password'; // Database password - change this!
$db_name = 'oxygenie_db'; // Database name

// Create connection
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set charset to UTF-8
mysqli_set_charset($conn, "utf8mb4");
?>