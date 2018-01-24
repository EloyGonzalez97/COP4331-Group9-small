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
		$sql = "CALL webalex_project_one.NewContact($userId, $firstName, $lastName, $phoneNumber, $email)";
		$result = $conn->query($sql);
		echo $result;

		$conn->close();
	}

	returnWithInfo($result);

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function returnWithInfo($result)
	{
		$ret = '{"contactId":"' . $result . '","error":""}';
		sendResultInfoAsJson($ret);
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
