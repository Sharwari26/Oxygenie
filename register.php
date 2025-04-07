<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "register"; // ✅ Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!empty($name) && !empty($email) && !empty($password)) {
  $sql = "INSERT INTO form (name, email, password) VALUES ('$name', '$email', '$password')";

  if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
  } else {
    echo "Error: " . $conn->error;
  }
} else {
  echo "Please fill in all fields!";
}

$conn->close();
?>
