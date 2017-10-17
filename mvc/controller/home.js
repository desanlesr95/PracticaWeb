$(document).ready(function () {
    $('#pager').addClass("nav-md");
    //$("#sidebar-menu").load('left_menu.html');
    session();
    //opciones();
});

var cookie;
function session(){
    $.ajax({
    type: "POST",
    url: "model/vals_session.php",
    data: [],
    beforeSend: function(){
                //$("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        console.log(resultado);
        cookie=JSON.parse(resultado);
        $(".nombre").html(cookie.nombre);
        if(cookie.id_rol!=103){
        $("#nuevaSolicitud").hide();
        }
        else if(cookie.id_rol!=100){
            $("#usuarios").hide();
        }     
    }
    });
}


function menu(opcion){
    switch(opcion){
        case 101:
			$('#page-body').load("view/usuarios/nuevo_usuario.html");
			break;
		case 102:
			$('#page-body').load("view/usuarios/lista_usuarios.html");
			break;
		case 103:
			
			break;
		case 201:
			$('#page-body').load("view/solicitudes/nueva_solicitud.html")
			break;
		case 202:
			$('#page-body').load("view/solicitudes/lista_solicitudes.html")
			break;
        case 203:
        
			break;
		default:
			break;
    }
}

function guardarUsuario(){
     $.ajax({
    type: "POST",
    url: "model/usuarios/guardarUsuario.php",
    data: $("#frm_registrar").serialize(),
    beforeSend: function(){
                $("#page-body").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        console.log(resultado);
        if ($.trim(resultado) === 'ok'){
                menu(102);
        }else{
            $("#page-body").html("Error de registro");
        }        
    }
    });  
}
