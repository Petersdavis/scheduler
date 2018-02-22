<?php
//version:

$version = "1.0";

include "./env.php";

$conn = new mysqli($servername, $username, $password);
if (!$conn) {
  die('Not connected : ' . mysql_error());
}

if( $conn->select_db($dbname)){
	$sql = "SELECT version FROM config ORDER BY version DESC LIMIT 1";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$stmt->bind_result($curr_version)
	$stmt->fetch();
	if($version == $curr_version){
	    exit("SUCCESS: DB Version Current")	
	}else{
		$stmt->close();
		include($version . ".php");
	}elseif ($version> $curr_version && $prev_version == 0){
		$stmt->close();
		include($version . ".php");
	}
} else {
	echo "DB ".$dbname ." CREATED:  Checking Schema";
	$sql = "CREATE DATABASE ?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param("s", $dbname);
	if($stmt->execute()){
		$stmt->close();
		$conn->select_db($dbname)
		echo "DB ".$dbname ." CREATED:  Checking Schema";
	}else{
		exit("ERROR: Could not Create Database");
	}	
}
	

//DB Created And Selected:


?>