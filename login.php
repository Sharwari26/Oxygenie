<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "register";

// Connect to DB
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST values
$email = trim($_POST['email']);
$password = trim($_POST['password']);

// Use prepared statement to avoid issues
$stmt = $conn->prepare("SELECT * FROM form WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['password'] === $password) {
        echo "Login successful! Welcome, " . $row['name'];
    } else {
        echo "Incorrect password!";
    }
} else {
    echo "No account found with that email.";
}

$stmt->close();
$conn->close();
?>
