function logoutController() {
    $('#logout').on('click', function (event) {
        event.originalEvent.preventDefault();
        location.replace("#login");
        $('#login-container').show();
        $('main').html('');
    });
};