function timelineController() {


    $('main').show(); // everytime when timelineController the main.display should be block
    $('.new-post').show();
    $('#about').hide();
    $('#main-content').css('width', '665px')


    var source = $('#timeline').html();
    $('main').html(source);

    logoutController();
    searchController();

    function showTimeline() {

        var users = JSON.parse(localStorage.getItem("users"))
        var logged = JSON.parse(sessionStorage.getItem('loggedUser'));
        var loggedUser = users.find(function(user) {
            return user.username == logged
        })
        if (!loggedUser) {
            loggedUser = {};
        }
        if (!loggedUser.moreInfo) {
            loggedUser.moreInfo = {};
        }
        var source = $('#nameTemplate').html();
        var timeline = Handlebars.compile(source);
        var html = timeline({
            firstName: loggedUser.fName,
            lastName: loggedUser.sName
        });
        var img = loggedUser.moreInfo.img

        $('#name').html(html);
        $('#name2').html(html);

        if (img != null) {
            $('.nav-avatar').css('background-image', 'url(' + img + ')');
            $('.profile-avatar').css('background-image', 'url(' + img + ')');
        }

        var username = JSON.parse(sessionStorage.getItem('loggedUser'));
        var posts = usersTimeline.getPosts(username);
        var source = $('#post').html();
        var timeline = Handlebars.compile(source);
        var html = timeline({
            posts: posts
        });
        $('#allposts').html(html);

        $('.user-reply-img').css('background-image', 'url( ' + img + ')')
        $('.user-post-img').each(function (img) {
            $(this).css('background-image', 'url("' + $(this).attr('id') + '")');
        });

        $('.reply-avatar').each(function () {
            $(this).css('background-image', 'url( ' + img + ')')
        })

        $('.reply-avatar > span').css('margin-left', '40px')
        // console.log(textReply)

        $('.reply-btn').on('click', function () {
            var about = JSON.parse(localStorage.getItem('about'));
            if (!about) {

            }
            var reply = $(this).parent().children('input').val();
            var id = $(this).parent().parent().attr('id')

            var username = JSON.parse(sessionStorage.getItem('loggedUser'));
            var users = JSON.parse(localStorage.getItem("users"))
            var loggedUser = users.find(function(user) {
                return user.username == username
            })
            usersTimeline.addReply(reply, username, loggedUser.moreInfo.img, id)

            showTimeline();
        })

    }
    $('.add-img').on('click', function(event) {
        if ($('#input-add-img').css('display') != 'inline-block') {
            $('#input-add-img').show()
        } else {
            $('#input-add-img').hide()
        }
    });

    $('#post-btn').on('click', function (event) {
        var about = JSON.parse(localStorage.getItem('about'));
        if (!about) {
            about = {}
        }
        var post = $('#new-post-input').val();
        var img = $('#input-add-img').val();
        var username = JSON.parse(sessionStorage.getItem('loggedUser'));
        var avatar = about.img


        var users = JSON.parse(localStorage.getItem("users"))
        var logged = JSON.parse(sessionStorage.getItem('loggedUser'));
        var loggedUser = users.find(function(user) {
            return user.username == logged
        })

        usersTimeline.addPost(post, img, username, loggedUser.moreInfo.img);

        $('#new-post-input').val(''); //clear input field after post
        $('#input-add-img').val(''); //clear input field after post
        $('#input-add-img').hide(); //hide img input after post
        showTimeline();
    });

    

    showTimeline();
};