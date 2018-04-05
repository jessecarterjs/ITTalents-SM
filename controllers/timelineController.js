function timelineController() {
   logoutController();
   searchController();
    $('main').show(); // everytime when timelineController the main.display should be block
    
   function showTimeline() {
        var username = JSON.parse(sessionStorage.getItem('loggedUser'));
        var posts = usersTimeline.getPosts(username);
        
        var source =  $('#post').html();
        var timeline = Handlebars.compile(source);
        var html = timeline({posts: posts});
        $('#allposts').html(html);

        $('#reply-btn').on('click', function(){
            var reply = $('.input-reply').val();
            var id = $('.input-reply').parent().parent().attr('id')
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
        console.log(username)
        usersTimeline.addPost(post, img, username);
        
        $('#new-post-input').val(''); //clear input field after post
        $('#input-add-img').val(''); //clear input field after post
        $('#input-add-img').hide(); //hide img input after post
        showTimeline();
   });

   
   showTimeline();
};