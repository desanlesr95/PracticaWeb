<?php
include_once '../conexion.php';
session_start();
$sql;	
if($_SESSION['id_rol']==103){
    $sql = $conn->prepare("select * from solicitudes
    WHERE id_receptor=? or id_solicitante=?");
    $sql->bindParam(1,$_SESSION['id_usuario'],PDO::PARAM_INT);
    $sql->bindParam(2,$_SESSION['id_usuario'],PDO::PARAM_INT);
}
else{
    $sql = $conn->prepare("select *  from solicitudes");
}
$sql->execute();  
$solicitudes=$sql->fetchAll();
echo json_encode($solicitudes);
?>