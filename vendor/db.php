<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "alltime5";
    
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    function checkConnection($conn) {
        if ($conn->connect_error) {
            die ("Connection failed: " . $conn->connect_error);
            echo "Error na db.php!";
        }
    }
?>