<?php

  if(isset($_POST['email'])) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  }

  if(isset($_POST['password'])) {
    $pass = md5(filter_var($_POST['password'], FLITER_SANITIZE_STRING));
  }

  $conn = new mysqli("localhost", "webalex", "vr8aTp573L", "webalex_project_one");

  if($conn->connect_error) {
    echo "BIG problem";
  } else {
    $sql = "CALL webalex_project_one.GetID($email, $pass)";
    $result = $conn->query($sql);

    if($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $id = $row["User_ID"];
    } else {
      $id = 0;
    }

  }
?>
