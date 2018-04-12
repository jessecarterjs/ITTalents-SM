function timelineController() {

    $('main').show(); // everytime when timelineController the main.display should be block
    $('.new-post').show();
    $('#container-with-friends').hide()
    $('#about').hide();
    $('#login-container').hide();
    $('#reg-container').hide();


    $('#uploadPhoto').hide()

    $('#main-content').css('width', '665px')

    usersTimeline.refreshPosts();
    var source = $('#timeline').html();
    $('main').html(source);

    logoutController();
    searchController();

    function showTimeline() {
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
        var img = loggedUser.moreInfo.img
        // Handlebars.registerHelper('isTrue', function(avatar) {
        //     var img = loggedUser.moreInfo.img
        //     
        //     return avatar != undefined;
        // });

        var source = $('#nameTemplate').html();
        var timeline = Handlebars.compile(source);
        var html = timeline({
            firstName: loggedUser.fName,
            lastName: loggedUser.sName
        });
        

        $('#name').html(html);
        $('#name2').html(html);

        if (img != null) {
            $('.nav-avatar').css('background-image', 'url(' + img + ')');
            $('.profile-avatar').css('background-image', 'url(' + img + ')');
        }

usersTimeline.refreshPosts();

        var username = JSON.parse(sessionStorage.getItem('loggedUser'));
        var posts = usersTimeline.getPosts(username);
        var source = $('#post').html();
        var timeline = Handlebars.compile(source);
        var html = timeline({
            posts: posts
        });
        $('#allposts').html(html);


        // това тук преглежда всички постове и покзва Х за триене на поста само на тези, които са направени от логнатия юзър
        posts.forEach(function (post) {
            if (post.username == username) {
                $(`div[id=${post.id}]`).children().children('span').css('display', 'block')
            }
        })

        $('#allposts').on('click', function (event) {
            if (event.target.className == 'del') {
                let post = event.originalEvent.path[2]
                let postID = post['id']

                var timelines = JSON.parse(localStorage.getItem('timelines'));
                var currentPost = timelines.findIndex(function (post) {
                    return post.id == postID
                })
                if (currentPost != -1) {
                    timelines.splice(currentPost, 1)
                    usersTimeline.removePost(postID)
                    localStorage.setItem('timelines', JSON.stringify(timelines))
                    post.remove()
                }
            }
        })
        usersTimeline.refreshPosts();
        
        $('.user-post-img').each(function (img) {
            $(this).css('background-image', 'url("' + $(this).attr('id') + '")');
        });

        $('.user-reply-img2').css('background-image', 'url( ' + img + ')')

        $('.reply-avatar').each(function () {
            $(this).css('background-image', 'url( ' + img + ')')
        })

        $('.reply-avatar > span').css('margin-left', '40px')

        $('.reply-btn').on('click', function () {
            var about = JSON.parse(localStorage.getItem('about'));
            if (!about) {

            }
            var reply = $(this).parent().children('input').val();
            var id = $(this).parent().parent().attr('id')
            if (reply != '') {
                var username = JSON.parse(sessionStorage.getItem('loggedUser'));
                var users = JSON.parse(localStorage.getItem("users"))
                var loggedUser = users.find(function (user) {
                    return user.username == username
                })
                usersTimeline.addReply(reply, username, loggedUser.moreInfo.img, id)
            }
            usersTimeline.refreshPosts();
            showTimeline();
        })

    }
    $('.add-img').on('click', function (event) {
        if ($('#input-add-img').css('display') != 'inline-block') {
            $('#input-add-img').show()
        } else {
            $('#input-add-img').hide()
        }
    });



    $('#post-btn').on('click', function (event) {
        var timelines = localStorage.getItem('timelines');
        if (timelines != null) {
            localStorage.setItem('timelines', timelines)
        }

        var about = JSON.parse(localStorage.getItem('about'));
        if (!about) {
            about = {}
        }
        var post = $('#new-post-input').val();
        var img = $('#input-add-img').val();

        if ((post != '') || ((post == '') && (img != ''))) {
            var username = JSON.parse(sessionStorage.getItem('loggedUser'));
            var avatar = about.img
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
            usersTimeline.addPost(post, img, username, loggedUser.moreInfo.img);

            $('#new-post-input').val(''); //clear input field after post
            $('#input-add-img').val(''); //clear input field after post
            $('#input-add-img').hide(); //hide img input after post

            usersTimeline.refreshPosts();
            showTimeline();
        }
    });

    $('.nav-logo').on('click', function () {
        location.replace('#mainTimeline')
    })

    $('.nav-avatar').on('click', function () {
        location.replace('#timeline')
    })

    usersTimeline.refreshPosts();
    showTimeline();
};

// showTimeline();

