<?php 
include_once '../conexion.php';	
$nombre=$_POST['nombre'];
$apellidop=$_POST['apellidop'];
$apellidom=$_POST['apellidom'];
$username=$_POST['username'];
$id_rol=$_POST['id_rol'];
$password=$_POST['contrasena'];
$password2=$_POST['contrasena2'];
$status="A";
$md5pass=md5($password);

if ($password==$password2) {
	try{
		$sql=$conn->prepare("insert into usuarios(nombre,apellidop,apellidom,id_rol,username,contrasena,status) values(?,?,?,?,?,?,?)");
		$sql->bindParam(1,$nombre,PDO::PARAM_STR);
		$sql->bindParam(2,$apellidop,PDO::PARAM_STR);
		$sql->bindParam(3,$apellidom,PDO::PARAM_STR);
		$sql->bindParam(4,$id_rol,PDO::PARAM_INT);
		$sql->bindParam(5,$username,PDO::PARAM_STR);
		$sql->bindParam(6,$md5pass,PDO::PARAM_STR);
		$sql->bindParam(7,$status,PDO::PARAM_STR);
		$sql->execute();
		echo "ok";
	}catch(PDOException $e){
		echo "Error de conexion";
	}
}
else{
	echo "error";
}

?>