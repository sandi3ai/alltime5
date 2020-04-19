<?php

    include_once 'db.php';
    
    checkConnection($conn);

    //so vse vrednosti podane?
    if (!empty($_POST['name']) && !empty($_POST['team']) && !empty($_POST['position'])) {
        $name = $_POST['name'];
        $team = $_POST['team'];
        $position = $_POST['position'];
        $playerID;

        if ( 0 < $_FILES['image']['error'] ) {

            echo 'Error: ' . $_FILES['image']['error'] . '<br>';
            
        }
        else {
            $sql = "INSERT INTO `player`(`name`, `team`, `position`) VALUES ('$name', '$team', '$position')";

            if ($conn->query($sql) === true) {
                echo json_encode("New player successfully added to database");
                
                //dobim info o zadnjem userID, imenu in končnici datoteke 
                $playerID = $conn->insert_id;
                $path_parts = pathinfo($_FILES["image"]["name"]);
                $extension = $path_parts['extension'];

 
                //shrani sliko v mapo img z imenom 10.jpg (primer torej $playerID + . + koncnica slike)
                $path = "images/" . $playerID . '.' . $extension;
                move_uploaded_file($_FILES['image']['tmp_name'], './images/' . $playerID . '.' . $extension);

                $sql = sprintf("UPDATE player SET image='%s' WHERE id=%s", $path, $playerID);
                 if ($conn->query($sql) === true) {
                     echo json_encode("Path of player image succesfully updated!");
                 }
                 else {
                echo json_encode('"Couldnt update path of player image: " . $sql . "<br>" . $conn->error');
                }                
            }
            else {
                echo json_encode('"Error: " . $sql . "<br>" . $conn->error');
            }

        }
    }


$conn->close();

?>