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
    $sql = "CALL webalex_project_one.GetID($email, $password)";
    $id = $conn->query($sql);
  }
?>
