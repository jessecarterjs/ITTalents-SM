function logoutController() {
    console.log('ogout controller')
    $('#logout').on('click', function (event) {
        console.log('clicked')
        event.originalEvent.preventDefault();
        location.replace("#login");
        $('#login-container').show();
        $('main').hide();
        console.log('clicked')
    });
};