$(document).ready(function () {
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
        makeTable(cookie);
    }
    });
    
});

function makeTable(colaboradores){
    console.log(colaboradores);
    var session;

     $.ajax({
    type: "POST",
    url: "model/solicitudes/lista_solicitudes.php",
    data: [],
    beforeSend: function(){
        $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        session=resultado;
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
        var reg="";
        for(var i=0;i<cookie.length;i++){
             var receptor="";
            var solicitante="";
            reg+="<tr id='"+cookie[i].id_solicitud+"'>";
            reg+="<td>"+cookie[i].id_solicitud+"</td>";
            for(var j=0;j<colaboradores.length;j++){
                if(colaboradores[j].id_usuario==cookie[i].id_receptor){
                    receptor="<td>"+colaboradores[j].nombre+" "+colaboradores[j].apellidop+" "
                    +colaboradores[j].apellidom+"</td>";
                    //break;
                }
                else if(colaboradores[j].id_usuario==cookie[i].id_solicitante){
                    solicitante="<td>"+colaboradores[j].nombre+" "+colaboradores[j].apellidop+" "
                    +colaboradores[j].apellidom+"</td>";
                    //break;
                }
                else if(cookie[i].id_receptor==cookie[i].id_solicitante){
                    solicitante="<td>"+colaboradores[j].nombre+" "+colaboradores[j].apellidop+" "
                    +colaboradores[j].apellidom+"</td>";
                    receptor=solicitante;
                }
            }
            console.log(solicitante+"\n"+receptor);
            reg+=solicitante;
            reg+=receptor;
            reg+="<td>"+cookie[i].descripcion+"</td>";
            reg+="<td>"+cookie[i].fecha_registro+"</td>";
            console.log(session);
            if(session.id_rol==103){
                reg+="<td>"+
                "<button class='btn btn-info btn-lg' data-toggle='modal' "+
                "data-target='#modalColaborador' onclick='cargarDatosModal("+cookie[i].id_solicitud+")'>Consultar</button>"+
                "</td>";    
            }
            else if(session.id_rol==102){
                reg+="<td>"+
                "<button class='btn btn-info btn-lg' data-toggle='modal' "+
                "data-target='#modalResponsable' onclick='cargarDatosModal("+cookie[i].id_solicitud+")'>Consultar</button>"+
                "</td>";
            }
            else if(session.id_rol==101){
                reg+="<td>"+
                "<button class='btn btn-info btn-lg' data-toggle='modal' "+
                "data-target='#modalLider' onclick='cargarDatosModal("+cookie[i].id_solicitud+")'>Consultar</button>"+
                "</td>";
            }
            else{
                reg+="<td>"+
                "<button class='btn btn-info btn-lg' data-toggle='modal' "+
                "data-target='#modalAdmin' onclick='cargarDatosModal("+cookie[i].id_solicitud+")'>Consultar</button>"+
                "</td>";
            }
            reg+="</tr>";
        }
        console.log(reg);
        $("#solicitudesTable").html(reg);
        }
    }); 
    }
    }); 
}