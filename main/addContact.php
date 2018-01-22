<?php
	$inData = getRequestInfo();
	
	$userId = $inData["userId"];
	$firstName = $inData["fname"];
	$lastName = $inData["lname"];
	$phoneNumber = $inData["phone"];
	$email = $indData["email"];


	$conn = new mysqli("localhost", "webalex", "vr8aTp573L", "webalex_project_one");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "CALL webalex_project_one.NewContact($userId, $firstName, $lastName, phoneNumber, email)";
		$result = $conn->query($sql);
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>