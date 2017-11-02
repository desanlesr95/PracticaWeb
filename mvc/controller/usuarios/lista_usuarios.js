$(document).ready(function () {
    $.ajax({
    type: "POST",
    url: "model/usuarios/lista_usuarios.php",
    data: [],
    beforeSend: function(){
                //$("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        var cookie=JSON.parse(resultado);
        console.log(cookie);
        var reg="";
        for(var i=0;i<cookie.length;i++){
            reg+="<tr id="+cookie[i].id_usuario+">";
            reg+="<td>"+cookie[i].nombre+"</td>";
            reg+="<td>"+cookie[i].apellidop+"</td>";
            reg+="<td>"+cookie[i].apellidom+"</td>";
            reg+="<td id="+cookie[i].id_rol+">"+rol(cookie[i].id_rol)+"</td>";
            reg+="<td>"+cookie[i].username+"</td>";
            reg+="<td id="+cookie[i].status+">"+status(cookie[i].status)+"</td>";
            reg+="<td>"+
            "<button class='btn btn-info btn-lg' data-toggle='modal' "+
            "data-target='#myModal' onclick='cargarDatos("+cookie[i].id_usuario+")'>Editar</button>"+
            "</td>";
            reg+="</tr>";
        }
        $("#usuariosTable").html(reg);
    }
    }); 
});

//100 Administrador
//101 Lider
//102 Responsable
//103 Colaborador
function rol(rol){
    switch (rol) {
        case "100":
            return '<span class="label label-primary">Administrador</span>';
        break;
        case "101":
            return '<span class="label label-success">Lider</span>';
        break;
        case "102":
            return '<span class="label label-info">Responsable</span>';
        break;
        case "103":
            return '<span class="label label-warning">Colaborador</span>';
        break;
        default:
        break;
    }
}

function status(status){
    switch (status) {
        case 'A':
            return '<span class="label label-success">Activo</span>';
        break;
        case 'I':
            return '<span class="label label-danger">Inactivo</span>';
        break;
        default:
        break;
    }
}




function cargarDatos(id_usuario){
    var datos=[];
    $('#'+id_usuario).each(function() {
            datos[0]=$(this).find('td').eq(0).html();
            datos[1]=$(this).find('td').eq(1).html();
            datos[2]=$(this).find('td').eq(2).html();
            datos[3]=$(this).find('td').eq(3).attr('id');
            datos[4]=$(this).find('td').eq(4).html();
            datos[5]=$(this).find('td').eq(5).attr('id');
            
    });

    $("#nombre").val(datos[0]);
    $("#apellidop").val(datos[1]);
    $("#apellidom").val(datos[2]);
    $("#id_rol").val(datos[3]);
    $("#username").val(datos[4]);
    $("#id").val(id_usuario);
    $("#radio"+datos[5]).attr('checked', true);
    
}

$('#frm_update').submit(function(e) {
      e.preventDefault();
      update();
});

function update(){
    console.log($("#frm_update").serialize());
     $.ajax({
    type: "POST",
    url: "model/usuarios/update_usuario.php",
    data: $("#frm_update").serialize(),
    beforeSend: function(){
        $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        $("#cerrar").click();
        var row=JSON.parse(resultado);
        console.log(row);
        var reg="";
            reg+="<td>"+row[0].nombre+"</td>";
            reg+="<td>"+row[0].apellidop+"</td>";
            reg+="<td>"+row[0].apellidom+"</td>";
            reg+="<td id="+row[0].id_rol+">"+rol(row[0].id_rol)+"</td>";
            reg+="<td>"+row[0].username+"</td>";
            reg+="<td id="+row[0].status+">"+status(row[0].status)+"</td>";
            reg+="<td>"+
            "<button class='btn btn-info btn-lg' data-toggle='modal' "+
            "data-target='#myModal' onclick='cargarDatos("+row[0].id_usuario+")'>Editar</button>"+
            "</td>";
        $("#"+row[0].id_usuario).html(reg);
    }
    }); 
 }