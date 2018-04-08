function aboutMeController() {
 
    location.replace("#aboutMe");
    $('.new-post').hide();
    var users = JSON.parse(localStorage.getItem("users"))
    var loged = JSON.parse(sessionStorage.getItem('loggedUser'));
    var logetUser = users.find(function (user) {
        return user.username == loged
    })

    var source = $('#aboutMe').html();
    var timeline = Handlebars.compile(source);
    var html = timeline({ logetUser: logetUser });
    $('#allposts').html(html);
    
    var about = JSON.parse(localStorage.getItem('about'));
    $('#age').val(about.age);
    $('#gender').val(about.gender);
    $('#phone').val(about.phone);
    $('#moreInfo').val(about.moreInfo);
    $('#imgAvatar').val(about.img);

    $('#save').on('click', function(){
        var age = $('#age').val()
        var gender = $('#gender').val()
        var phone = $('#phone').val()
        var moreInfo = $('#moreInfo').val()
        var img = $('#imgAvatar').val()
        localStorage.setItem('about', JSON.stringify({age, gender, phone, moreInfo, img}));
    })
}