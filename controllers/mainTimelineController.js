function mainTimeline() {
	$('.user-menu').remove();
	$('#main-content').remove();

	$(function() {
		$('.mainTimeline').remove()
		$('main').append('<div class="mainTimeline"></div>')
		
		var posts = JSON.parse(localStorage.getItem('timelines'));
		var source = $('#post').html();
		var timeline = Handlebars.compile(source);
		var html = timeline({
			posts: posts
		});

		$('.mainTimeline').html(html);


		var username = JSON.parse(sessionStorage.getItem('loggedUser'));
		posts.forEach(function(post) {
			if (post.username == username) {
				$(`div[id=${post.id}]`).children().children('span').css('display', 'block')
			}
		})
		$('.mainTimeline').on('click', function(event) {
			if (event.target.className == 'del') {
				let post = event.originalEvent.path[2]
				let postID = post['id']

				var timelines = JSON.parse(localStorage.getItem('timelines'));
				var currentPost = timelines.findIndex(function(post) {
					return post.id == postID
				})
				if (currentPost != -1) {
					timelines.splice(currentPost, 1)
					usersTimeline.removePost(postID)
					localStorage.setItem('timelines', JSON.stringify(timelines))
					post.remove()
				}
				usersTimeline.refreshPosts();
				mainTimeline()
			}

		})

		$('.reply-btn').on('click', function() {
			var timelines = JSON.parse(localStorage.getItem('timelines'));
			localStorage.setItem('timelines', JSON.stringify(timelines))
			var reply = $(this).parent().children('input').val();
			var id = $(this).parent().parent().attr('id')
			if (reply != '') {
				var username = JSON.parse(sessionStorage.getItem('loggedUser'));
				var users = JSON.parse(localStorage.getItem("users"))
				var loggedUser = users.find(function(user) {
					return user.username == username
				})
				usersTimeline.addReply(reply, username, loggedUser.moreInfo.img, id)
			}
			usersTimeline.refreshPosts();
			mainTimeline()
		})
	})



}