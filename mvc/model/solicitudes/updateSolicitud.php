<?php 
include_once '../conexion.php';	
$id_solicitud=$_POST['id_solicitud'];
$valor=$_POST['valor'];
$id_usuario=$_POST['id_usuario'];
echo $id_usuario;
$fecha=date('y-m-d');
try{
	$sql;
	if($valor=="Terminada"){
		$sql=$conn->prepare("update solicitudes set status=?,fecha_termino=? WHERE id_solicitud=?");
		$sql->bindParam(1,$valor,PDO::PARAM_STR);
		$sql->bindParam(2,$fecha,PDO::PARAM_STR);
		$sql->bindParam(3,$id_solicitud,PDO::PARAM_INT);
	}
	else if($valor=="Aceptada_Responsable"){
		$sql=$conn->prepare("update solicitudes set status=?,id_responsable=?, fecha_responsable=? 
		WHERE id_solicitud=?");
		$sql->bindParam(1,$valor,PDO::PARAM_STR);
		$sql->bindParam(2,$id_usuario,PDO::PARAM_INT);
		$sql->bindParam(3,$fecha,PDO::PARAM_STR);
		$sql->bindParam(4,$id_solicitud,PDO::PARAM_INT);
	}
	else if($valor=="Aceptada_Lider"){
		$sql=$conn->prepare("update solicitudes set status=?,id_lider=?, fecha_lider=? 
		WHERE id_solicitud=?");
		$sql->bindParam(1,$valor,PDO::PARAM_STR);
		$sql->bindParam(2,$id_usuario,PDO::PARAM_INT);
		$sql->bindParam(3,$fecha,PDO::PARAM_STR);
		$sql->bindParam(4,$id_solicitud,PDO::PARAM_INT);
	}
	$sql->execute();
	echo "ok";
}catch(PDOException $e){
		echo $e;
}

?>