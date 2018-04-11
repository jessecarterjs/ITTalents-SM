
var usersPhotos = (function () {

    var nextId = Date.now() + Math.floor(Math.random() * Math.floor(1000));

    function Photo(url, username, avatar) {
        this.id = nextId++;
        this.url = url;
        this.username = username;
        this.avatar = avatar;
    }

    function AllPhotos() {
        if (localStorage.getItem("allPhotos") != null) {
            this.allPhotos = JSON.parse(localStorage.getItem("allPhotos"));
        } else {
            this.allPhotos = [];
        }
    }

    AllPhotos.prototype.removePhoto = function (id) {
        var index = this.allPhotos.findIndex(function (photo) {
            return photo.id == id;
        });
        this.allPhotos.splice(index, 1);
        localStorage.setItem("allPhotos", JSON.stringify(this.allPhotos));
    }

    AllPhotos.prototype.addPhoto = function (url, username, avatar) {
        var photo = new Photo(url, username, avatar);
        this.allPhotos.unshift(photo);
        localStorage.setItem("allPhotos", JSON.stringify(this.allPhotos));
    };

    AllPhotos.prototype.getPhotos = function (username) {
        return this.allPhotos.filter(function (photo) {
            return photo.username == username;
        })
    };



    return new AllPhotos()
})();