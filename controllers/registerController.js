function registerController() {

	  $('#reg-btn').on('click', function (event) {
        event.originalEvent.preventDefault();

// ****************************************************


       if(userStorage.registerUser(firstName,secoundName,username,password,emailAddres)){
            $('main').html()
            location.replace("#login");
            $('#login-container').show();
            $("#rFirstName").val("");
            $("#rSecondName").val("");
            $('#rUsername').val("");
            $("#rPassword").val("");
            $("#rEmail").val("");
       } else {
            location.replace("#register");
            $('#login-container').hide();
            $('#reg-container').show();
            
            $("#rFirstName").val("");
            $("#rSecondName").val("");
            $('#rUsername').val("");
            $("#rPassword").val("");
            $("#rEmail").val("");
       }

    });
}