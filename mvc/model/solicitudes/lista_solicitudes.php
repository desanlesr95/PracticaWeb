<?php
include_once '../conexion.php';
session_start();
$sql;	
if($_SESSION['id_rol']==103){
    $sql = $conn->prepare("select solicitudes.*, usuarios.nombre  from solicitudes,usuarios
    WHERE (id_solicitante=id_usuario or id_receptor=id_usuario) and 
    (id_receptor=? or id_solicitante=?)");
    $sql->bindParam(1,$_SESSION['id_usuario'],PDO::PARAM_INT);
}
else{
    $sql = $conn->prepare("select *  from solicitudes");
}
$sql->execute();  
$solicitudes=$sql->fetchAll();
echo json_encode($solicitudes);
?>