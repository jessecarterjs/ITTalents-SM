
function loginController() {
    // if (localStorage.getItem('isLogged') == null) {
    location.replace("#login");
    // } else {
    $('#reg-container').hide();

    $('#login-btn').on('click', function (event) {
        event.originalEvent.preventDefault()

        var username = document.getElementById("#lUsername").value;
        var password = document.getElementById("#lPassword").value

        if(userStorage.loginUser(username, password)){
            sessionStorage.setItem('isLogged', true);
            sessionStorage.setItem('loggedUser', JSON.stringify(username));
            location.replace("#timeline");

            //location.replace("#register"); // tedy: сложила съм го за пример , за да видя дали пренасочва след логването 

             var source = $('#timeline').html();
            // var timeline = Handlebars.compile(source);
            // var html = timeline({});

            $('main').html(source);
            $('#login-container').hide();
            $('#reg-container').hide();
            $("#lUsername").val("");
            $("#lPassword").val("");

        } else {
            alert("Enter again! Wrong user")

            $("#lUsername").val("");
            $("#lPassword").val("");
            location.replace("#login");
            $('#login-container').show();
            $('#reg-container').hide();
        }


    });
    $('#no-acc').on('click', function (event) {
        event.originalEvent.preventDefault();
        location.replace("#register");
        $('#login-container').hide();
        $('#reg-container').show();
        // var source =  $('#register').html();
        // var regForm = Handlebars.compile(source);
        // var html = regForm({});
        // $('#login-container .form').html(html);
        // $('#login-container .form').css('height', '520');
        // $('#login-container').css('top', '0');
    });
    // }
}




// function praskoviController() {
    //     if (sessionStorage.getItem('isLogged') == null) {
    //         location.replace("#login");
    //     } else {
    //         var praskoviTemplate = document.getElementById('praskoviTemplate').innerHTML;
    //         var praskovi = praskoviService.getAll();

    //         var praskoviPage = Handlebars.compile(praskoviTemplate);
    //         document.querySelector('main').innerHTML = praskoviPage({ praskovi: praskovi });



    //     }
    // };



// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('register').addEventListener('click', function (event) {
//         event.preventDefault();

//         document.getElementById('loginForm').style.display = 'none';
//         document.getElementById('registerForm').style.display = 'block';
//     });


//     document.getElementById('save').addEventListener('click', function (event) {
//         event.preventDefault();

//         var username = document.getElementById('newUsername').value;
//         var password = document.getElementById('newPassword').value;

//         userStorage.register(username, password);

//         document.getElementById('loginForm').style.display = 'block';
//         document.getElementById('registerForm').style.display = 'none';
//         console.log(users)
//     });


//     document.getElementById('login').addEventListener('click', function (event) {
//         event.preventDefault();

//         var username = document.getElementById('username').value;
//         var password = document.getElementById('password').value;

//         if (userStorage.login(username, password)) {
//             document.getElementById('login-container').style.display = 'none';
//             document.getElementById('main-container').style.display = 'block';

//             document.querySelector('#main-container > p').innerHTML = "Hi " + username;
//             document.querySelector('p.error').innerText = "";
//         } else {
//             document.querySelector('p.error').innerText = "Invalid username / password";
//         }
//     });

// }, false);