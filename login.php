<?php

  $data = getRequestInfo();

  $id = 0;
  $firstName = "";
  $lastName = "";

  $conn = new mysqli("localhost", "webalex", "vr8aTp573L", "webalex_project_one");

  if($conn->connect_error) {

    echo "BIG problem";

  } else {

    //$sql = "CALL webalex_project_one.GetID($email, $pass)";
    $temp = md5($data["password"]);
    $sql = "SELECT User_ID, U_FirstName, U_LastName FROM Users where U_Email='" . $data["login"] . "' and U_Password = '" . $temp . "'";
    $result = $conn->query($sql);

    if($result->num_rows > 0) {

      $row = $result->fetch_assoc();
      $id = $row["User_ID"];
      $firstName = $row["U_FirstName"];
      $lastName = $row["U_LastName"];

    } else {
      echo "failed query";
      returnWithError("User does not exist");
    }
    $conn->close();
  }

  returnWithInfo($id, $firstName, $lastName);

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
