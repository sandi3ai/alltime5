<?php

    include_once 'db.php';
    
    checkConnection($conn);

    //so vse vrednosti podane?
    if (!empty($_POST['name']) && !empty($_POST['team']) && !empty($_POST['position']) && !empty($_POST['image'])) {
        $name = $_POST['name'];
        $team = $_POST['team'];
        $position = $_POST['position'];
        $image = $_POST['image'];
        //insert to db
        $sql = "INSERT INTO players (name, team, position, image)
            VALUES ('$name', '$team', '$position', '$image')";

        if ($conn->query($sql) === true) {
            echo json_encode("New record created successfully");
        } else {
            echo json_encode('"Error: " . $sql . "<br>" . $conn->error');
        }
    }

$conn->close();

?>