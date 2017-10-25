<?php
include_once '../conexion.php';	
session_start();
$sql = $conn->prepare("select * from usuarios where id_rol=103 and id_usuario!=?");
$sql->bindParam(1,$_SESSION['id_usuario'],PDO::PARAM_INT);
$sql->execute();  
$users=$sql->fetchAll();
echo json_encode($users);
?>