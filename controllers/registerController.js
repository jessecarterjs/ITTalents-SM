function registerController() {

	  $('#reg-btn').on('click', function (event) {
        event.originalEvent.preventDefault();

        var firstName = $("#rFirstName").val();
        var secoundName = $("#rSecoundName").val();
        var username = $('#rUsername').val();
        var password = $("#rPassword").val();
        var emailAddres = $("#rEmail").val();

        if(firstName.trim() == ""){
            // $("#registerError").html("Empty name").css("color","red");
        }

       if(userStorage.registerUser(firstName,secoundName,username,password,emailAddres)){
            $('main').html()
            location.replace("#login");
            $('#login-container').show();
            $("#rFirstName").val("");
            $("#rSecoundName").val("");
            $('#rUsername').val("");
            $("#rPassword").val("");
            $("#rEmail").val("");
       } else {
            location.replace("#register");
            $('#login-container').hide();
            $('#reg-container').show();
            
            $("#rFirstName").val("");
            $("#rSecoundName").val("");
            $('#rUsername').val("");
            $("#rPassword").val("");
            $("#rEmail").val("");
       }

    });
}