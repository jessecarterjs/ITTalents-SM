function searchController() {
    var users = [];
    $.get('/users.json')
        .then(function (data) {
            users = data;

        });
    $('#search-input').on('keyup', function () {
        console.log('refresh', users);
        var source = $('#search').html();
        var searchTable = Handlebars.compile(source)
        var search = $(this).val().toLowerCase();
        var filteredUsers = users.filter(function (user) {
            return search != '' && (user.firstName.toLowerCase().indexOf(search) != -1);
        });
        var html = searchTable({ users: filteredUsers })
        $('#search-results').html(html);
        if (search != '') {
            $('#search-results').css('display', 'block');
        } else {
            $('#search-results').hide();
        }
    });

};
