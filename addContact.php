<?php
	$inData = getRequestInfo();

	$userId = htmlspecialchars($inData["userId"]);
	$firstName = htmlspecialchars($inData["fname"]);
	$lastName = htmlspecialchars($inData["lname"]);
	$phoneNumber = htmlspecialchars($inData["phone"]);
	$email = htmlspecialchars($inData["email"]);

	$contactId = "0";
	$conn = new mysqli("localhost", "webalex", "vr8aTp573L", "webalex_project_one");

	if ($conn->connect_error)
	{
		echo "Connection error";
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "CALL webalex_project_one.NewContact('$userId', '$firstName', '$lastName', '$phoneNumber', '$email')";
		$result = $conn->query($sql);
		if(!$result)
		{
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
		else {
			$r = $result->fetch_assoc();
			$contactId = $r["New_ID"];
		}

		$conn->close();
	}

	returnWithInfo($contactId);

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function returnWithInfo($contactId)
	{
		$ret = '{"contactId":"' . $contactId . '","error":""}';
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
