<?php 
include_once '../conexion.php';	
$nombre=$_POST['nombre'];
$apellidop=$_POST['apellidop'];
$apellidom=$_POST['apellidom'];
$username=$_POST['username'];
$id_rol=$_POST['id_rol'];
$password=$_POST['contrasena'];
$passwordn=$_POST['contrasenaN'];
$password2N=$_POST['contrasena2N'];
$id=$_POST['id'];
$status=$_POST['group'];
$md5pass=md5($passwordn);
$md5pass2=md5($password);

if ($passwordn==$password2N) {
	try{
		$sql=$conn->prepare("update usuarios set nombre=?,apellidop=?,apellidom=?,id_rol=?,username=?,contrasena=?,status=? where id_usuario=? and contrasena=?");
		$sql->bindParam(1,$nombre,PDO::PARAM_STR);
		$sql->bindParam(2,$apellidop,PDO::PARAM_STR);
		$sql->bindParam(3,$apellidom,PDO::PARAM_STR);
		$sql->bindParam(4,$id_rol,PDO::PARAM_INT);
		$sql->bindParam(5,$username,PDO::PARAM_STR);
		$sql->bindParam(6,$md5pass,PDO::PARAM_STR);
		$sql->bindParam(7,$status,PDO::PARAM_STR);
		$sql->bindParam(8,$id,PDO::PARAM_INT);
		$sql->bindParam(9,$md5pass2,PDO::PARAM_STR);
		$sql->execute();

		$sql=$conn->prepare("select * from usuarios where id_usuario=?");
		$sql->bindParam(1,$id,PDO::PARAM_INT);
		$sql->execute();
		echo json_encode($sql->fetchAll());
	}catch(PDOException $e){
		echo "Contraseña incorrecta";
	}
}
else{
	echo "error";
}

?>