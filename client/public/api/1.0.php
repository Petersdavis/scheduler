<?php
//code to iterate back through versions
$prev_version = 0;
if($curr_version < $prev_version){
	include($prev_version . ".php");
}

$sql = "CREATE TABLE 'config' ( 
	id int NOT NULL AUTO_INCREMENT,
	version decimal(5,2)
)";
$stmt = $conn->prepare($sql);
$stmt->execute();
$stmt->close();

$sql = "INSERT INTO config (version) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("d", $version);
$stmt->execute();
$stmt->close();


$sql = "CREATE TABLE restaurants (
	id int NOT NULL AUTO_INCREMENT,
	title varchar(255),
	email UNIQUE varchar(255)
)";
$stmt = $conn->prepare($sql);
$stmt->execute();
$stmt->close();


$sql = "CREATE TABLE employees (
	id int NOT NULL AUTO_INCREMENT,
	rest_id int,
	title varchar(255),
	email UNIQUE varchar(255),
	PRIMARY KEY (id),
	FOREIGN KEY (rest_id) REFERENCES restaurants(id)
)";
$stmt = $conn->prepare($sql);
$stmt->execute();
$stmt->close();

$sql = "CREATE TABLE schedules (
	id int NOT NULL AUTO_INCREMENT,
	schedule BLOB,
	timestamp decimal (15,5),
	email varchar(255),
	PRIMARY KEY (id),
	FOREIGN KEY (rest_id) REFERENCES restaurants(id)
)";
$stmt = $conn->prepare($sql);
$stmt->execute();
$stmt->close();

include "1.0.test.php";
?>