<?php
	$inData = getRequestInfo();

	$contactId = $inData["contactId"];


	$conn = new mysqli("localhost", "webalex", "vr8aTp573L", "webalex_project_one");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "CALL webalex_project_one.DeleteContact('$contactId')";
		if(!$conn->query($sql))
		{
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
		else
		{
			echo "Delete successful";
		}
		$conn->close();
	}

	//returnWithError("");

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
