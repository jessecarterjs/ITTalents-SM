function photosController() {

    var source = $('#photos').html();
    var timeline = Handlebars.compile(source);
    var html = timeline({ });
    $('#main-content').html(html);
    function showPhotos() {
        var username = JSON.parse(sessionStorage.getItem('loggedUser'));
        var photos = usersPhotos.getPhotos(username);
        var source = $('#photo').html();
        var timeline = Handlebars.compile(source);
        var html = timeline({ photos: photos });
        $('#allPhotos').html(html);

        photos.forEach(function (photo) {
            if (photo.username == username) {
                $(`div[id=${photo.id}]`).children().children('span').css('display', 'block');
            }
        });

        $('.user-post-img').each(function (img) {
            $(this).css('background-image', 'url("' + $(this).attr('id') + '")');
        });

        $('.del').on('click', function() {
            var id = $(this).parent().parent().attr('id');
            usersPhotos.removePhoto(id);
            showPhotos();
        });
    }
    location.replace("#photos");
    $('main').show(); // everytime when timelineController the main.display should be block
    $('.new-post').hide();
    $('#about').hide();
    $('#allposts').hide();
    $('#main-content').css('width', '665px')

    // $('#main-content').html($('#uploadPhoto'));

    $('#uploadPhoto').css('display', 'block');
    $('.new-post-footer').css('top', '40px');
    $('.add-img').on('click', function (event) {
        if ($('#input-add-photo').css('display') != 'inline-block') {
            $('#input-add-photo').show()
        } else {
            $('#input-add-photo').hide()
        }
    });

    $('#add-btn').on('click', function (event) {
        var allPhotos = localStorage.getItem('allPhotos');
        if (allPhotos != null) {
            localStorage.setItem('allPhotos', allPhotos)
        }
        var username = JSON.parse(sessionStorage.getItem('loggedUser'));
        var url = $('#input-add-photo').val();

        if (url != '') {
            var logged = JSON.parse(sessionStorage.getItem('loggedUser'));
            var users = JSON.parse(localStorage.getItem("users"))
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
            
            usersPhotos.addPhoto(url, username, img);
            // console.log($(this).parent().parent().attr('id'))

            $('#input-add-photo').val('');
            $('#input-add-img').hide();
        }
        showPhotos();
    });

   

    logoutController();
    searchController();
    showPhotos();
}