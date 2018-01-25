<?php
	$inData = getRequestInfo();

	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "webalex", "vr8aTp573L", "webalex_project_one");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "CALL webalex_project_one.GetContacts($userId)";
		$rows = array();
		while($r = mysqli_fetch_assoc($sql))
		{
			$rows[] = $r;
		}
		echo json_encode($rows);
		$conn->close();
	}
	sendResultInfoAsJson(json_encode($rows));
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	/*function returnWithInfo($result)
	{
		$ret = '{"contactId":"' . $result . '","error":""}';
		sendResultInfoAsJson($ret);
	}
	*/
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
