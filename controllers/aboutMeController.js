function aboutMeController() {

        logoutController();
        searchController();

    location.replace("#aboutMe");
    $('.new-post').hide();
    $('#about').show();
    $('#main-content').show()
    $('#container-with-friends').hide()
    var users = JSON.parse(localStorage.getItem("users"))
    var logged = JSON.parse(sessionStorage.getItem('loggedUser'));
    var loggedUser = users.find(function (user) {
        return user.username == logged
    })
    if (!loggedUser) {
        loggedUser = {};
    }
    if (!loggedUser.moreInfo) {
        loggedUser.moreInfo = {};
    }

    $('#main-content').css('width', '800px')

    var source = $('#aboutMe').html();
    var timeline = Handlebars.compile(source);
    var html = timeline({loggedUser});
    $('#main-content').html(html);
    
    var about = JSON.parse(localStorage.getItem('users'));
    $('#age').val(loggedUser.moreInfo.age);
    $('#gender').val(loggedUser.moreInfo.gender);
    $('#phone').val(loggedUser.moreInfo.phone);
    $('#moreInfo').val(loggedUser.moreInfo.info);
    $('#imgAvatar').val(loggedUser.moreInfo.img);

    $('#save-btn').on('click', function(){
        var age = $('#age').val()
        var gender = $('#gender').val()
        var phone = $('#phone').val()
        var info = $('#moreInfo').val()
        var img = $('#imgAvatar').val().trim()

        if (age != '') {
            loggedUser.moreInfo['age'] = age;
        }
        if (gender != '') {
            loggedUser.moreInfo['gender'] = gender;
        }
        if (phone != '') {
            loggedUser.moreInfo['phone'] = phone;
        }
        if (info != '') {
            loggedUser.moreInfo['info'] = info;
        }
        if (img != '') {
            loggedUser.moreInfo['img'] = img;
        }
        
        localStorage.setItem('users', JSON.stringify(users))
        
        location.replace("#timeline");
        var source = $('#timeline').html();
            $('main').html(source);
            $('.about').hide();

         $('.new-post').show();

        
        
    })


}