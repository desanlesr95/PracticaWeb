$(document).ready(function () {
    $.ajax({
    type: "POST",
    url: "model/session.php",
    data: [],
    beforeSend: function(){
                //$("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        if (resultado=="ok"){
            console.log(resultado);
            $("#pager").load('view/home.html');
        }
        else{
            $("#pager").load('view/login.html');
        }        
    }
    }); 
});
