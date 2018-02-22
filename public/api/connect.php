<?php

$conn = new mysqli($servername, $username, $password);
if (!$conn) {
  die('Not connected : ' . mysql_error());
}

if(!$conn->select_db($dbname)){
	exit("COULD NOT SELECT DATABASE");
}

?>
