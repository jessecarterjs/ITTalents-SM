var userStorage = (function() {
    function User(fName, sName, username, password, email) {
        Object.defineProperty(this, "fName", {
            enumerable: true,
            writable: false,
            configurable: false,
            value: fName
        })
        // this.fName = fName;
        Object.defineProperty(this, "sName", {
            enumerable: true,
            writable: false,
            configurable: false,
            value: sName
        })
        //this.sName = sName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.moreInfo = {
            age: null,
            gender: null,
            phone: null,
            info: null,
            img: 'https://image.ibb.co/i922Kx/profile.png'
        };

    }

    function UserStorage() {
        if (localStorage.getItem("users") != null) {
            this.users = JSON.parse(localStorage.getItem("users"));
        } else {
            this.users = [];
            this.users.push(new User("Ivan", "Ivanov", "vankata94", "ivan123", "ivan@abv.bg"));
            this.users.push(new User("Ivan", "Ivanov", "vankata21", "ivan123", "ivan3@abv.bg"));
            this.users.push(new User("Christian", "Petrov", "chris", "chris", "chris@abv.bg"));
            this.users.push(new User("Chris", "Carter", "chrisss", "chrissss", "chris2@abv.bg"));
            this.users.push(new User("Misho", "Ivanov", "misho81", "misho81ivanov", "misho@abv.bg"));
            this.users.push(new User("Mitko", "Peshov", "mitko", "miteto99", "pesho@abv.bg"));
        }
    }


    UserStorage.prototype.registerUser = function(firstName, secoundName, username, password, email) {

        if ((typeof firstName == "string") && (firstName.length > 2)) {
            if ((typeof secoundName == "string") && (secoundName.length > 2)) {
                if ((typeof username == "string") && (username.length > 4)) {
                    /* при тази проверка аз не успях да се регистрирам с моето име, но никъде не изведе съобщение, че username трябва да е с повече от 4 символа
                    същото е и при паролата */
                    var findUser = this.users.find(function(user) {
                        return user.username == username
                    });
                    if (findUser != null) {
                        alert("Тhere is such a username. Please enter again!");
                        return;
                    }
                    if ((typeof password == "string") && (password.length > 4)) {
                        if ((typeof email == "string") && (email.length > 4)) {
                            var findEmail = this.users.find(function(user) {
                                return user.email == email
                            });
                            if (findEmail != null) {
                                alert("Тhere is such an email address!");
                                return;
                            }
                            var newUser = new User(firstName, secoundName, username, password, email);
                            this.users.push(newUser);
                            // localStorage.setItem("users", JSON.stringify(this.users));

                            if (localStorage.getItem("users") == null) {
                                localStorage.setItem("users", JSON.stringify(this.users));
                            } else {
                                var strg = JSON.parse(localStorage.getItem('users'))
                                strg.push(newUser)
                                localStorage.setItem("users", JSON.stringify(strg));

                            }
                            return true;
                        } else {
                            alert("Invalid email. Please enter, again!")
                            return;
                        }
                    } else {
                        alert("Invalid password. Please enter, again!");
                        return;
                    }
                } else {
                    alert("Invalid username. Please enter, again!");
                    return;
                }
            } else {
                alert("Invalid second name. Please enter, again!");
                return;
            }
        } else {
            alert("Invalid first name. Please enter, again!")
            return;
        }
    }

    UserStorage.prototype.loginUser = function(username, password) {
        if (((typeof username == "string") && (username.length > 0)) && ((password.length > 0))) {

            var findUser = this.users.findIndex(function(user) {
                return user.username == username && user.password == password;
            })

            if (findUser >= 0) {
                if (localStorage.getItem("users") == null) {
                    localStorage.setItem("users", JSON.stringify(this.users));
                }
                return true;
            } else {
                // alert("Try Again")
                return false;
            }
        }
    }
    return new UserStorage();
})();