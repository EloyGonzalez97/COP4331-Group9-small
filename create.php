<?php

  $data = getRequestInfo();

  $id = 0;
  $email = htmlspecialchars($data["email"]);
  $password = md5(htmlspecialchars($data["password"]));
  $firstname = htmlspecialchars($data["firstName"]);
  $lastname = htmlspecialchars($data["lastName"]);


  $conn = new mysqli("localhost", "webalex", "vr8aTp573L", "webalex_project_one");

  if($conn->connect_error) {

    returnWithError($conn->connect_error);

  } else {

    $emailCheck = "SELECT U_Email from Users Where U_Email='" . $email . "'";
    $result = $conn->query($emailCheck);
    if($result->num_rows > 0) {

      returnWithError("An account has already been created using this email");
      exit();

    } else {
      //echo $email . " " . $password . " " . $firstname . " " . $lastname;
      //$sql = "INSERT INTO Users (User_ID, U_Email, U_Password, U_FirstName, U_LastName) VALUES ('" . $email . "', '" . $password . "', '" . $firstname . "', '" . $lastname . "')";

      $sql = "CALL newUser('" . $email . "', '" . $password . "', '" . $firstname . "', '" . $lastname . "')";
      if($conn->query($sql)) {
        ;
      } else {
        returnWithError("Failed to create account");
      }

      $sql = "CALL getID('" . $email . "', '" . $password . "')";
      $result = $conn->query($sql);

      if($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $id = $row["User_ID"];

      }
    }
    $conn->close();
  }

  returnWithInfo($id, $firstname, $lastname);

  function getRequestInfo(){
    return json_decode(file_get_contents('php://input'), true);
  }

  function sendAsJson($obj) {
    header('Content-type: application/json');
    echo $obj;
  }

  function returnWithError($error) {
    $ret = '{"id":0,"firstName":"","lastName":"","error":"' . $error . '"}';
    sendAsJson($ret);
  }

  function returnWithInfo($id, $firstName, $lastName) {
    $ret = '{"id":"' . $id . '","firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    sendAsJson($ret);
  }


?>
