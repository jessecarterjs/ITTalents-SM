function loginController() {
    location.replace("#login");
    $('#reg-container').hide();

    $('#login-btn').on('click', function(event) {
        event.originalEvent.preventDefault()

        var username = document.getElementById("#lUsername").value;
        var password = document.getElementById("#lPassword").value;

        if (userStorage.loginUser(username, password)) {
            sessionStorage.setItem('isLogged', true);
            sessionStorage.setItem('loggedUser', JSON.stringify(username));
            location.replace("#timeline");

            //location.replace("#register"); // tedy: сложила съм го за пример , за да видя дали пренасочва след логването 

            var source = $('#timeline').html();
            $('main').html(source);
            $('#login-container').hide();
            $('#reg-container').hide();
            $("#lUsername").val("");
            $("#lPassword").val("");

        } else {
            alert("Enter again! Wrong user")

            $("#lUsername").val("");
            $("#lPassword").val("");
            location.replace("#login");
            $('#login-container').show();
            $('#reg-container').hide();
        }


    });
    $('#no-acc').on('click', function(event) {
        event.originalEvent.preventDefault();
        location.replace("#register");
        $('#login-container').hide();
        $('#reg-container').show();
        // var source =  $('#register').html();
        // var regForm = Handlebars.compile(source);
        // var html = regForm({});
        // $('#login-container .form').html(html);
        // $('#login-container .form').css('height', '520');
        // $('#login-container').css('top', '0');
    });
    // }
}