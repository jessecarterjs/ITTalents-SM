
document.addEventListener('DOMContentLoaded', function () {
    function router() {
        var page = location.hash.slice(1);

        switch (page) {
            case 'login':
                loginController();
                break;
            case 'register':
                registerController();
                break;
            case 'timeline':
                timelineController();// постове, изтриване на собствени постове, редактиране
                break;
            case 'aboutMe':
                aboutController();// профил, информация за юзера, редактиране
                break;
            case 'friends':
                friendsController();// показване на всички приятели, изтриване на приятели
                break;
            case 'searchFriends':
                searchController();// search - търсене на приятели изпращане на покана за приятелство
                break;
            case 'notification':
                notificationController();// потвърждение на поканата за приятелство 
                break;
            // case 'groups':
            //     groupsController(); //създаване на групи
            //     break;
            case 'logout':
            console.log('logout');
                logoutController(); //ще води към login page
                break;

            default:
                loginController();
                break;
        }
    }

    window.addEventListener('hashchange', router);
    router();
})