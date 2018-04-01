function timelineController() {
   logoutController()
   searchController()

   $('.add-img').on('click', function (event) {
      if ($('#input-add-img').css('display') != 'inline-block') {
      	$('#input-add-img').show()
      } else {
      	$('#input-add-img').hide()
      }
   });

   $('#post-btn').on('click', function (event) {
      console.log('тук трябва да добавим нов див към #main-content с новия пост');
   });
};