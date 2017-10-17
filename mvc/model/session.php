<?php
    session_start();
    if($_SESSION['mvc_conectado']!=null && $_SESSION['mvc_conectado']==1){
        echo "ok";
    }
    else{
        echo "error";
    }

?>