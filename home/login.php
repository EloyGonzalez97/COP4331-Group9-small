<?php

  $id = 0;

  $conn = new mysqli("localhost", "webalex", "vr8aTp573L", "webalex_project_one");

  if($conn->connect_error) {
    echo "BIG problem";
  } else {
    $sql = "SELECT ID firstName, lastName, FROM Users where email='" . $input["email"] . "' and password='" . $input["password"] . "'";
    $result = $conn->query($sql);

    if($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $id = $row["ID"];
    }

  }
?>
