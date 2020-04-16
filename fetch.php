<?php
    include_once 'db.php';
    checkConnection($conn);

    $sql = "SELECT * FROM player";
    $result = $conn->query($sql);
    $array = mysqli_fetch_row($result);                         //fetch result    

    if ($result->num_rows > 0) { // dokler so vrstice, berem vrstico po vrstico
    // output data of each row
        while($row = $result->fetch_assoc()) {
            echo json_encode($array);           //echo zakodirano v json
        }
        }
        else {
        echo "0 results";
        }
    $conn->close();
?>