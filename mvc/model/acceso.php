<?php 
	session_start();
	include_once 'conexion.php';
	$user = $_POST['usuario'];
	$passwd = $_POST['passwd'];
	$passmd5 = md5($passwd);
	$sql = $conn->prepare("select * from usuarios where username = ? and contrasena = ? and status='A'");
	$sql->bindParam(1, $user, PDO::PARAM_STR);
	$sql->bindParam(2, $passmd5, PDO::PARAM_STR);
	$sql->execute();	
	if ($sql->rowCount() > 0 ){
		while($rows = $sql->fetch(PDO::FETCH_ASSOC)){
			$_SESSION['mvc_conectado'] = 1;
			$_SESSION['id_usuario'] = $rows['id_usuario'];
			$_SESSION['id_rol'] = $rows['id_rol'];
			$_SESSION['nombre'] = $rows['nombre'];
			$_SESSION['apaterno'] = $rows['apellidop'];
			$_SESSION['amaterno'] = $rows['apellidom'];
		}
		echo "ok";
	}else{
		$_SESSION['mvc_conectado'] = 0;
		echo "Error";
	}
?>