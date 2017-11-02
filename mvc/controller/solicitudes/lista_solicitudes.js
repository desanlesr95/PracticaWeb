var id_user;
$(document).ready(function () {
    getResponsables();
    getLideres();
    var colaboradores;
    $.ajax({
    type: "POST",
    url: "model/usuarios/colaboradores.php",
    data: [],
    beforeSend: function(){
        $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        var cookie=JSON.parse(resultado);
        getSession(cookie);
    }
    });
    
});
///Usuarios
var colaborador;
var responsables;
function getResponsables(){
    $.ajax({
    type: "POST",
    url: "model/usuarios/responsables.php",
    data: [],
    beforeSend: function(){
        $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        responsables= JSON.parse(resultado);
    }
    });
}

var lideres;
function getLideres(){
    $.ajax({
    type: "POST",
    url: "model/usuarios/lideres.php",
    data: [],
    beforeSend: function(){
        $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        lideres= JSON.parse(resultado);
    }
    });
}
///
function getSession(colaboradores){
    $.ajax({
    type: "POST",
    url: "model/vals_session.php",
    data: [],
    beforeSend: function(){
        $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultadoS){
        var cookie=JSON.parse(resultadoS);
        makeTable(colaboradores,cookie);
    }
    });
}

function makeTable(colaboradores,session){
    console.log(colaboradores);
    id_user=session.id_usuario;
    $.ajax({
    type: "POST",
    url: "model/solicitudes/lista_solicitudes.php",
    data: [],
    beforeSend: function(){
        $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        var cookie=JSON.parse(resultado);
        console.log(cookie);
        console.log(session);
        console.log(colaboradores);
        var reg="";
        setSolictud(cookie,session.id_usuario);
        for(var i=0;i<cookie.length;i++){
            var receptor="";
            var solicitante="";
            reg+="<tr id='"+cookie[i].id_solicitud+"'>";
            reg+="<td>"+cookie[i].id_solicitud+"</td>";
            for(var j=0;j<colaboradores.length;j++){
                if(colaboradores[j].id_usuario==cookie[i].id_receptor){
                    receptor="<td>"+colaboradores[j].nombre+" "+colaboradores[j].apellidop+" "
                    +colaboradores[j].apellidom+"</td>";
                    console.log(receptor);
                    //break;
                }
                else if(cookie[i].id_receptor==session.id_usuario){
                    receptor="<td>"+session.nombre+" "+session.apaterno+" "
                    +session.amaterno+"</td>";
                    //break;
                }
                if(cookie[i].id_solicitante==session.id_usuario){
                    solicitante="<td>"+session.nombre+" "+session.apaterno+" "
                    +session.amaterno+"</td>";
                    //break;
                }
                else if(colaboradores[j].id_usuario==cookie[i].id_solicitante){
                    solicitante="<td>"+colaboradores[j].nombre+" "+colaboradores[j].apellidop+" "
                    +colaboradores[j].apellidom+"</td>";
                }
            }
            reg+=solicitante;
            if(receptor==null){
                reg+="<td>No disponible</td>";
            }
            else{
                reg+=receptor;
            }
            reg+="<td>"+cookie[i].descripcion+"</td>";
            reg+="<td>"+cookie[i].fecha_registro+"</td>";
            if(session.id_rol==103){
                reg+="<td>"+
                "<button class='btn btn-info btn-lg' data-toggle='modal' "+
                "data-target='#modalConsulta' onclick='cargarDatosModal("+
                cookie[i].id_solicitud+",103,"+i+")'>Consultar</button>"+
                "</td>";    
            }
            else if(session.id_rol==102){
                reg+="<td>"+
                "<button class='btn btn-info btn-lg' data-toggle='modal' "+
                "data-target='#modalConsulta' onclick='cargarDatosModal("+
                cookie[i].id_solicitud+",102,"+i+")'>Consultar</button>"+
                "</td>";
            }
            else if(session.id_rol==101){
                reg+="<td>"+
                "<button class='btn btn-info btn-lg' data-toggle='modal' "+
                "data-target='#modalConsulta' onclick='cargarDatosModal("
                +cookie[i].id_solicitud+",101,"+i+")'>Consultar</button>"+
                "</td>";
            }
            else{
                reg+="<td>"+
                "<button class='btn btn-info btn-lg' data-toggle='modal' "+
                "data-target='#modalConsulta' onclick='cargarDatosModal("
                +cookie[i].id_solicitud+",100,"+i+")'>Consultar</button>"+
                "</td>";
            }
            reg+="<td>"+
                "<span class='label label-default status' id='statusTable'>"+cookie[i].status+"</span>"+
                "</td>";
            reg+="</tr>";
        }
        $("#solicitudesTable").html(reg);
    }
    });  
}

var solicitud;
var user;
function setSolictud(cookie,id){
    solicitud=cookie;
    user=id;
}

function cargarDatosModal(id_solicitud,rol,i){
    console.log(user);
    var datos=[];
    if(rol==103){
        $("#rol").html("Colaborador");
        if(solicitud[i].status=="Aceptada_Lider"&&solicitud[i].id_receptor==id_user){
            $("#accion").html("Terminar");
            $('#accion').click(function(){
                update(solicitud[i].id_solicitud,"Terminada");
            });
        }
        else{
            $("#accion").hide();
            $("#status").html(solicitud[i].status);
        }
    }
    else if(rol==102){
        $("#rol").html("Responsale");
        if(solicitud[i].status=="CREADA"){
            $("#accion").html("Autorizar");
            $('#accion').click(function(){
                update(solicitud[i].id_solicitud,"Aceptada_Responsable");
            });
        }
        else{
           $("#accion").hide();
            $("#status").html(solicitud[i].status); 
        }
    }
    else if(rol==101){
        $("#rol").html("Lider");
        if(solicitud[i].status=="Aceptada_Responsable"){
            $("#accion").html("Autorizar");
            $('#accion').click(function(){
                update(solicitud[i].id_solicitud,"Aceptada_Lider");
            });
        }
        else{
           $("#accion").hide();
            $("#status").html(solicitud[i].status); 
        }
    }
    else{
         $("#accion").hide();
        $("#rol").html("Administrador");
    }
    $('#'+id_solicitud).each(function() {
            datos[0]=$(this).find('td').eq(0).html();
            datos[1]=$(this).find('td').eq(1).html();
            datos[2]=$(this).find('td').eq(2).html();
            datos[3]=$(this).find('td').eq(3).html();
            datos[4]=$(this).find('td').eq(4).html();
            datos[5]=$(this).find('td').eq(6).text();
    });
    console.log(responsables);
    console.log(lideres);
    $("#bitacora").empty();
    $("#solicitud").html(datos[0]);
    $("#solicitante").html(datos[1]);
    $("#receptor").html(datos[2]);
    $("#descripcion").html(datos[3]);
    $("#status").html(datos[5]);


    var registro="<tr>"+

    "<td>"+datos[4]+"</td><td>Registro de solicitud</td><td>"+datos[1]+"</td><tr>";
    if(solicitud[i].id_responsable!=null){
        registro+="<tr><td>"+solicitud[i].fecha_responsable+"</td><td>Aceptada por responsable</td><td>"+
        buscarResponsale(solicitud[i].id_responsable)+"</td></tr>";
    }
    if(solicitud[i].id_lider!=null){
        registro+="<tr><td>"+solicitud[i].fecha_lider+"</td><td>Aceptada por lider</td><td>"+
        buscarLider(solicitud[i].id_lider)+"</td></tr>";
    }
    if(solicitud[i].fecha_termino!=null){
        registro+="<tr><td>"+solicitud[i].fecha_termino+"</td><td>Terminada</td><td>"+
        datos[2]+"</td></tr>";
    }

    $("#bitacora").html(registro);
}

function buscarColaborador(id){
    console.log(colaborador);
    for(var i=0;i<colaborador.length;i++){
        if(colaborador[i].id_usuario==id_lider){
            return colaborador[i].nombre;
        }
    }
}
function buscarResponsale(id_responsable){
    for(var i=0;i<responsables.length;i++){
        if(responsables[i].id_usuario==id_responsable){
            return responsables[i].nombre;
        }
    }
}
function buscarLider(id_lider){
    for(var i=0;i<lideres.length;i++){
        if(lideres[i].id_usuario==id_lider){
            return lideres[i].nombre;
        }
    }
}

function update(id_solicitud,val){
    console.log(user);
    $.ajax({
    type: "POST",
    url: "model/solicitudes/updateSolicitud.php",
    data: {id_solicitud: id_solicitud,valor:val,id_usuario: user},
    beforeSend: function(){
        $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        $("#close").click();
        if(resultado=="ok"){
            $("#close").click();
            for(var i=0;i<solicitud.length;i++){
                if(solicitud[i].id_solicitud==id_solicitud){
                    solicitud[i].status=val;
                }
            }
            $('#'+id_solicitud).find('span.status').text(val);
            //menu(202);           
        }
        console.log(solicitud);
        console.log(val);
    }
    });
}