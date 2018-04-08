function timelineController() {

    logoutController();
    searchController();
    $('main').show(); // everytime when timelineController the main.display should be block
    $('.new-post').show();
    function showTimeline() {

        var users = JSON.parse(localStorage.getItem("users"))
        var loged = JSON.parse(sessionStorage.getItem('loggedUser'));
        var logetUser = users.find(function (user) {
            return user.username == loged
        })
        var source = $('#nameTemplate').html();
        var timeline = Handlebars.compile(source);
        var html = timeline({ firstName: logetUser.fName, lastName: logetUser.sName });
        $('#name').html(html);
        $('#name2').html(html);


        var about = JSON.parse(localStorage.getItem('about'));
        var source = $('#avatarTemplate').html();
        var timeline = Handlebars.compile(source);
        var html = timeline({ img: about.img });
        $('.profile-avatar').css('background-image', 'url('+about.img+')');
        $('.nav-avatar').css('background-image', 'url('+about.img+')');
        console.log('img ', about.img)


        var username = JSON.parse(sessionStorage.getItem('loggedUser'));
        var posts = usersTimeline.getPosts(username);
        var source = $('#post').html();
        var timeline = Handlebars.compile(source);
        var html = timeline({ posts: posts });
        $('#allposts').html(html);

        $('.reply-btn').on('click', function () {
            console.log('click')
            var reply = $(this).parent().children('input').val();
            var id = $(this).parent().parent().attr('id')
            console.log('ID ', id, reply);
            var username = JSON.parse(sessionStorage.getItem('loggedUser'));
            usersTimeline.addReply(reply, username, id)
            showTimeline();
        })
    };

    $('.add-img').on('click', function (event) {
        if ($('#input-add-img').css('display') != 'inline-block') {
            $('#input-add-img').show()
        } else {
            $('#input-add-img').hide()
        }
    });

    $('#post-btn').on('click', function (event) {
        var post = $('#new-post-input').val();
        var img = $('#input-add-img').val();
        var username = JSON.parse(sessionStorage.getItem('loggedUser'));

        usersTimeline.addPost(post, img, username);

        $('#new-post-input').val(''); //clear input field after post
        $('#input-add-img').val(''); //clear input field after post
        $('#input-add-img').hide(); //hide img input after post
        showTimeline();
    });



    showTimeline();
};