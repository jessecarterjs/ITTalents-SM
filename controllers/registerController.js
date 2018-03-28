function registerController() {

	  $('#reg-btn').on('click', function (event) {
        event.originalEvent.preventDefault();
        $('main').html()
        location.replace("#login");
        $('#login-container').show();
    });
}