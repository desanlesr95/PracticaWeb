<?php
include_once '../conexion.php';	
$sql = $conn->prepare("select * from usuarios where id_rol=101");
$sql->execute();  
$users=$sql->fetchAll();
echo json_encode($users);
?>