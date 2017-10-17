function acceso(){
    $.ajax({
    type: "POST",
    url: "model/acceso.php",
    data: $("#frm_login").serialize(),
    beforeSend: function(){
                $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        if ($.trim(resultado) === 'ok'){
                location.reload(true);
        }else{
            $("#resultado").html("Error de Acceso!");
        }        
    }
    });    
    return false;
}

function menu(opcion){
	$.ajax({
    type: "POST",
    url: "controller/controller.php",
    data: {opt_form: opcion},
    beforeSend: function(){
        $("#page-body").html("<img src='images/ajax-loader.gif'>");
   },    
    success: function(resultado){
        $("#page-body").html(resultado);        
    }
    });
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
    return false;
}
var contenido=[];

function getUsers(){
    $.ajax({
    type: "POST",
    url: "model/usuarios/usuarios.php",
    data: [],
    beforeSend: function(){
        $("#page-body").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        return resultado;
				}
    });
} 
   

function newSolicitud(){
	console.log($("#frm_newSolicitud").serialize());
		$.ajax({
    type: "POST",
    url: "model/solicitudes/crearSolicitud.php",
    data:  $("#frm_newSolicitud").serialize(),
    beforeSend: function(){
        $("#page-body").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
    				console.log(resultado);
        menu(202);
				}
    });
}



function botonStatus(status){
    if(status=='A'){
        return "<button type='button' class='btn btn-success'>Activo</button>";
    }
    else{
        return "<button type='button' class='btn btn-danger'>Inactivo</button>";
    }
}

function edit(id){
    var content;
    $.ajax({
    type: "POST",
    url: "model/usuarios/usuarioByID.php",
    data: {id_usuario:id},
    beforeSend: function(){
    },    
    success: function(resultado){
        content = JSON.parse(resultado);
        //console.log(resultado);
        console.log(content);
        $('#nombre').val(content.nombre);
        $('#apellidop').val(content.apellidop);
        $('#apellidom').val(content.apellidom);
        $('#id_rol').val(content.id_rol);
        $('#username').val(content.username);
        $('#id').val(content.id_usuario);
    }
    });   
}



function update(){
    console.log($("#frm_update").serialize());
    $.ajax({
    type: "POST",
    url: "model/usuarios/updateUsuario.php",
    data: $("#frm_update").serialize(),
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
    return false;
}


function terminar_sol(id_solicitud){
			 $.ajax({
    type: "POST",
    url: "model/solicitudes/terminarSol.php",
    data: {id_solicitud: id_solicitud},
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
    return false;
}
