<?php

## $conn & $dbname from connect.php 
$sql = "SHOW DATABASES LIKE ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $dbname);
$stmt->execute();
$stmt->bind_result($database);
if($stmt->fetch()){
	echo "DATABASE EXISTS...";
}else{
	exit ("DATABASE DOES NOT EXIST");
}
$stmt->close();

$sql = "SELECT version FROM config ORDER BY version DESC LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->execute();
$stmt->bind_result($res);
if($stmt->fetch()){
  echo "\n DB Version:" . $res;  	
}else{
  echo "\n COULD NOT RETRIEVE VERSION";
}
$stmt->close();

$sql = "DESCRIBE ?"
$stmt = $conn->prepare($sql);
$tables = ["restaurants", "employees", "schedules"];
foreach($tables as $table){
$stmt->bind_param("s", $table);
if($stmt->execute()){
	echo "\n TABLE: " .$table; 
	$stmt->bind_result($field, $type, $null, $key, $default, $extra);
	while($stmt->fetch()){
	  echo "\n". $field . " " . $type ." " . $null	 ." " .$key ." " .$default ." " .$extra
	}
	
}else{
	echo "\n".$table . "TABLE D.N.E! ... "	
}




?>