function timelineController() {
   logoutController()
   searchController()

   function showTimeline() {
        var username = JSON.parse(sessionStorage.getItem('loggedUser'));
        var posts = usersTimeline.getPosts(username);
        
        var source =  $('#post').html();
        var timeline = Handlebars.compile(source);
        var html = timeline({posts: posts});
        $('#allposts').html(html);
   }
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

        showTimeline();

        console.log('тук трябва да добавим нов див към #main-content с новия пост');
   });
   showTimeline();
};