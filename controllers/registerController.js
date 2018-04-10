function registerController() {

    $('#reg-btn').on('click', function(event) {
        event.originalEvent.preventDefault();

        var firstName = document.getElementById("#rFirstName").value;
        var secondName = document.getElementById("#rSecondName").value;
        var username = document.getElementById("#rUsername").value;
        var password = document.getElementById("#rPassword").value;
        var emailAddres = document.getElementById("#rEmail").value;

        var regUser = userStorage.registerUser(firstName, secondName, username, password, emailAddres)

        if (regUser) {
            $('main').html()
            location.replace("#login");
            $('#login-container').show();
            document.getElementById("#rFirstName").value = "";
            document.getElementById("#rSecondName").value = "";
            document.getElementById("#rUsername").value = "";
            document.getElementById("#rPassword").value = "";
            document.getElementById("#rEmail").value = "";

            return $('#reg-btn').off();
        } else {
            
            location.replace("#register");
            $('#login-container').hide();
            $('#reg-container').show();

            $("#rFirstName").val("");
            $("#rSecondName").val("");
            $('#rUsername').val("");
            $("#rPassword").val("");
            $("#rEmail").val("");
            return;
        }

    });
}