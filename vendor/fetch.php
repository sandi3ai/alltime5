<?php

    include_once 'db.php';

    checkConnection($conn);
    
    $result = mysql_query("SELECT * FROM $tableName");
    $array = mysql_fetch_row($result);  

  
$conn->close();

?>