function logoutController() {
    $('#logout').on('click', function (event) {
        event.originalEvent.preventDefault();
        location.replace("#login");
        $('main').html($('#login-container').html());
    });
};