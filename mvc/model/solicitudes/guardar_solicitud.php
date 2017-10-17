<?php 
include_once '../conexion.php';	
session_start();
date_default_timezone_get();
$description=$_POST['description'];
$solicitud_to=$_POST['solicitud_to'];
$status='CREADA';

try{
	$sql=$conn->prepare("insert into solicitudes(id_solicitante,id_receptor,descripcion,status,fecha_registro) values(?,?,?,?,?)");
	$sql->bindParam(1,$_SESSION['id_usuario'],PDO::PARAM_INT);
	$sql->bindParam(2,$solicitud_to,PDO::PARAM_INT);
	$sql->bindParam(3,$description,PDO::PARAM_STR);
	$sql->bindParam(4,$status,PDO::PARAM_INT);
	$sql->bindParam(5,date('y-m-d'),PDO::PARAM_STR);
	$sql->execute();
	echo "ok";
}catch(PDOException $e){
		echo "Error";
}

?>