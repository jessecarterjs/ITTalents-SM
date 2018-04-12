function friendsController() {
    console.log('friendsController()')
    $("#main-content").hide();
    $("#container-with-friends").show()
    $("#all-friends").show();
    $("#request-friends").show();
    $("#myFriends").show();
    $(".textTitleSections").show();

    function usersEmail() {
        var users = JSON.parse(localStorage.getItem("users"));
        var loged = JSON.parse(sessionStorage.getItem('loggedUser'));
        var searchUser = users.find(function(user) {
            return user.username == loged
        });
        var emailSendPerson = searchUser.email;
        return emailSendPerson;
    }


    var source = $('#all-friends-in-list-template').html();
    var template = Handlebars.compile(source);
    var users = userStorage.getAllUsersForUser(usersEmail());
    var htmlPage = template({
        users: users
    });
    $("#all-friends").html(htmlPage);
    $(".textAdded").hide();

    var source = $("#requested-list-template").html();
    var template = Handlebars.compile(source);
    var users = userStorage.showRequestList(usersEmail());
    var htmlP = template({
        users: users
    });
    $("#request-friends").html(htmlP);

    var source = $("#added-friends-list-template").html();
    var template = Handlebars.compile(source);
    var users = userStorage.showFriendsList(usersEmail());
    var htmlTempl = template({
        users: users
    });
    $("#myFriends").html(htmlTempl);


    $(".friend-card").on("click", function() {
        if (event.target.className == 'addPerson') {
            var emailGetPerson = $(this).children().eq(2).text();
            userStorage.sendFriendRequest(usersEmail(), emailGetPerson);
            $(this).remove();
        }
        //emailSendPerson => кой праща & мейла на логнатия потребител
        //emailGetPerson => на кого праща;   
    })



    $(".accept").on("click", function(event) {
        event.originalEvent.preventDefault()
        console.log('*************')
        // if (event.target.className == 'accept') {
        var receiverEmail = $(this).prev().text()
        // $(this).closest(".friend-card").remove();

        userStorage.addFriendInFriendsList(usersEmail(), receiverEmail);

        userStorage.clearRequestList(usersEmail(), receiverEmail);
        $(this).closest('.friend-card').remove()

        var source = $("#added-friends-list-template").html();
        var template = Handlebars.compile(source);
        var users = userStorage.showFriendsList(usersEmail());
        var htmlTempl = template({
            users: users
        });
        $("#myFriends").html(htmlTempl);
        // }
    });

    $(".ignore").on("click", function() {
        var receiverEmail = $(this).closest(".friend-card").children().eq(3).text().trim();
        $(this).closest(".friend-card").remove();
        userStorage.clearRequestList(usersEmail(), receiverEmail);
    })

    $("#viewPrifile").on("click", function() {
        //
        location.replace("#sasass");
    })


}