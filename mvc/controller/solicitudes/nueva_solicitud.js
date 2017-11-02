$(document).ready(function () {
    $.ajax({
    type: "POST",
    url: "model/usuarios/colaboradores.php",
    data: [],
    beforeSend: function(){
        $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        var cookie=JSON.parse(resultado);
        console.log(cookie);
        var reg="";
        for(var i=0;i<cookie.length;i++){
            reg+="<option value='"+cookie[i].id_usuario+"'>"+cookie[i].nombre+" "+cookie[i].apellidop+" "
            +cookie[i].apellidom+"</option>";
        }
        $("#solicitud_to").html(reg);
    }
    }); 
});

function newSolicitud(){
    $.ajax({
    type: "POST",
    url: "model/solicitudes/guardar_solicitud.php",
    data: $("#frm_newSolicitud").serialize(),
    beforeSend: function(){
        $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        menu(202);
    }
    });
}