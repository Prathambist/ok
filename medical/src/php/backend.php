<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "localhost";
$dbname = "e-com";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die("Connection failed: " . $conn->connect_error);
}

// Ensure it's POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = $_POST["action"] ?? "";

    // Handle registration
    if ($action === "register") {
        $name = trim($_POST["name"] ?? '');
        $gmail = trim($_POST["email"] ?? '');
        $password = trim($_POST["password"] ?? '');

        if (empty($name) || empty($gmail) || empty($password)) {
            http_response_code(400);
            echo "All fields are required.";
            exit;
        }

        if (!filter_var($gmail, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "Invalid email format.";
            exit;
        }

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO personal_info (Full_Name, Gmail, Password) VALUES (?, ?, ?)");
        if (!$stmt) {
            http_response_code(500);
            echo "Prepare failed: " . $conn->error;
            exit;
        }

        $stmt->bind_param("sss", $name, $gmail, $hashed_password);

        if ($stmt->execute()) {
            http_response_code(201);
            echo "Account created successfully!";
        } else {
            if ($conn->errno == 1062) {
                http_response_code(409);
                echo "This Gmail is already registered.";
            } else {
                http_response_code(500);
                echo "Database error: " . $conn->error;
            }
        }

        $stmt->close();

    }

    // Handle login
    elseif ($action === "login") {
        $gmail = trim($_POST["email"] ?? '');
        $password = trim($_POST["password"] ?? '');

        if (empty($gmail) || empty($password)) {
            http_response_code(400);
            echo "Email and password are required.";
            exit;
        }

        $stmt = $conn->prepare("SELECT Password FROM personal_info WHERE Gmail = ?");
        $stmt->bind_param("s", $gmail);
        $stmt->execute();
        $res = $stmt->get_result();

        if ($res->num_rows === 0) {
            http_response_code(404);
            echo "User not found.";
        } else {
            $row = $res->fetch_assoc();
            if (password_verify($password, $row['Password'])) {
                http_response_code(200);
                echo "Success: Logged in!";
            } else {
                http_response_code(401);
                echo "Incorrect password.";
            }
        }

        $stmt->close();
    }

    // Unknown action
    else {
        http_response_code(400);
        echo "Invalid action.";
    }

} else {
    http_response_code(405);
    echo "Invalid request method.";
}

$conn->close();
?>
