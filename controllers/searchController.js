function searchController() {
    var users = JSON.parse(localStorage.getItem('users'));

    $('#search-input').on('keyup', function() {

        var source = $('#search').html();
        var searchTable = Handlebars.compile(source)
        var search = $(this).val().toLowerCase();
        var filteredUsers = users.filter(function(user) {
            return search != '' && (user.fName.toLowerCase().indexOf(search) != -1);
        });

        var html = searchTable({
            users: filteredUsers
        })
        $('#search-results').html(html);
        if (search != '') {
            $('#search-results').css('display', 'block');
        } else {
            $('#search-results').hide();
        }
        $(window).on('click', function(event){
            event.originalEvent.preventDefault()
        $('#search-input').val('')
        $('#search-results').fadeOut();
        $(window).off()
    })
    });
    
};