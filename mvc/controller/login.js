function entrar(){
    console.log($("#frm_login").serialize());
    $.ajax({
    type: "POST",
    url: "model/acceso.php",
    data: $("#frm_login").serialize(),
    beforeSend: function(){
            $("#resultado").html("<img src='images/ajax-loader.gif'>");
    },    
    success: function(resultado){
        if (resultado=="ok"){
           $("#pager").load("view/home.html");
        }        
    }
    }); 
}