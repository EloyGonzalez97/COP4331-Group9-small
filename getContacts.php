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

		$sql = "CALL webalex_project_one.GetContacts('$userId')";
		$result = $conn->query($sql);

		for($i = 0; $i < $result->num_rows; $i++)
		{
			$rows = $result->fetch_assoc();
			$contactId = $rows["Contact_ID"];
			$firstName = $rows["C_FirstName"];
			$lastName = $rows["C_LastName"];
			$phone = $rows["C_PhoneNumber"];
			$email = $rows["C_Email"];
			returnWithInfo($contactId, $firstName, $lastName, $phone, $email);
		}
		//echo json_encode($rows);
		$conn->close();
	}
	//sendResultInfoAsJson($rows);
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function returnWithInfo($contactId, $firstName, $lastName, $phone, $email)
	{
		$ret = '{"contactId":"' . $contactId . '","firstName":"' . $firstName . '","lastName":"' . $lastName . '","phoneNumber":"' . $phone . '","email":"' . $email . '","error":""}';
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
