var usersTimeline = (function () {

    var nextId = Date.now() + Math.floor(Math.random() * Math.floor(1000));

    function Post(text, img, username) {
        this.id = nextId++;
        this.text = text;
        this.img = img;
        this.username = username;
        this.replies = [];
    }

    function Reply(text, username) {
        this.text = text;
        this.username = username;
    }

    function Timeline() {
        if (localStorage.getItem("timelines") != null) {
            this.timelines = JSON.parse(localStorage.getItem("timelines"));
        } else {
            this.timelines = [];
        }
    }

    Timeline.prototype.addPost = function(text, img, username){
        var post = new Post (text, img, username);
        this.timelines.unshift(post); // тук трябва да е unshift вместо push за да може най-новия пост да излиза най-отгоре 
        localStorage.setItem("timelines", JSON.stringify(this.timelines));
    };

    Timeline.prototype.getPosts = function (username) {
        return this.timelines.filter(function (post) {
            return post.username == username;
        })
    };

    Timeline.prototype.addReply = function (text, username, id) {
        var reply = new Reply(text, username)
        var index = this.timelines.findIndex(function (post) {
            return post.id == id;
        })
        this.timelines[index].replies.push(reply);
        localStorage.setItem("timelines", JSON.stringify(this.timelines));
    }

    return new Timeline()
})()