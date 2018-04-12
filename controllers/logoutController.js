function logoutController() {

    $('#logout').on('click', function () {
        location.replace("#login");
        $('#login-container').show();
        $('main').hide();
        $('#container-with-friends').hide()
        sessionStorage.setItem('isLogged', false)
        sessionStorage.setItem('loggedUser', JSON.stringify(''))
        
    })
  
};