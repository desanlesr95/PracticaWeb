<?php
include_once '../conexion.php';	
$sql = $conn->prepare("select * from usuarios");
$sql->execute();  
$users=$sql->fetchAll();
echo json_encode($users);
?>