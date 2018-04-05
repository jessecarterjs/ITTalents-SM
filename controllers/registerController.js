function registerController() {

	  $('#reg-btn').on('click', function (event) {
        event.originalEvent.preventDefault();

// ****************************************************

<<<<<<< HEAD

       if(userStorage.registerUser(firstName,secoundName,username,password,emailAddres)){
=======
// chris : Закоментирано е малко по-долу тъй като кода не 
// взимаше стойността от инпутите, най-вероятно защото и в 
// индекс страницата не бяха направени id-та на инпутите
// и хвърляше undefined, и съответно нямаше как да се регистрира user.
//  за тази цел го направих с getElementById сложих id-та на input-ите в index.html и всичко сработи;
// също така при регистрация съм махнал една проверка за символите 
// която също правеше проблем и пак не можеше да се направи регистрация
// също така при логин направих същото упражнение с id-тата и getElementByID и вече всичко работи >>>>

// понеже вече съм дроп утре ще дооправя about me-то, friends и post-овете 

//              registration - OK!       login - OK!

// ****************************************************

        // var firstName = $("#rFirstName").val();
        // var secoundName = $("#rSecoundName").val();
        // var username = $('#rUsername').val();
        // var password = $("#rPassword").val();
        // var emailAddres = $("#rEmail").val();

        var firstName = document.getElementById("#rFirstName").value;
        var secondName = document.getElementById("#rSecondName").value;
        var username = document.getElementById("#Username").value;
        var password = document.getElementById("#Password").value;
        var emailAddres = document.getElementById("#Email").value;

        // console.log(firstName, secondName, username, password, emailAddres)
        


        // if(firstName.trim() == ""){
        //     // $("#registerError").html("Empty name").css("color","red");
        // }


       if(userStorage.registerUser(firstName,secondName,username,password,emailAddres)){
>>>>>>> daa46b1c934c6004a588d5de9d185a9e452c8e96
            $('main').html()
            location.replace("#login");
            $('#login-container').show();
            $("#rFirstName").val("");
            $("#rSecondName").val("");
            $('#rUsername').val("");
            $("#rPassword").val("");
            $("#rEmail").val("");
       } else {
            location.replace("#register");
            $('#login-container').hide();
            $('#reg-container').show();
            
            $("#rFirstName").val("");
            $("#rSecondName").val("");
            $('#rUsername').val("");
            $("#rPassword").val("");
            $("#rEmail").val("");
       }

    });
}