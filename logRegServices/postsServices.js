var usersTimeline = (function () {

    function Post(text, img, username) {
       this.text = text;
       this.img = img;
       this.username = username;
    }

    function Timeline (){
        if(localStorage.getItem("timelines") != null){
            this.timelines = JSON.parse(localStorage.getItem("timelines"));   
        } else {
           this.timelines = []; 
       }
    }

    Timeline.prototype.addPost = function(text, img, username){
        var post = new Post (text, img, username);
        this.timelines.push(post);
        localStorage.setItem("timelines", JSON.stringify(this.timelines));
    }
    Timeline.prototype.getPosts = function(username) {
        return this.timelines.filter(function(post) {
            return post.username == username;
        })
    }
    return new Timeline()
})()