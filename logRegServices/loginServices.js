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
        this.friendsList = []; // list of users object
        this.requestedList = [];
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

    UserStorage.prototype.getAllUsers = function() {
        if (localStorage.getItem("users") == null) {
            console.log('sdsdsdsds')
            localStorage.setItem("users", JSON.stringify(this.users));
        } else {
            console.log('aaaaaa')
            var users = JSON.parse(localStorage.getItem("users"));
            this.users = users;
            localStorage.setItem("users", JSON.stringify(this.users))
        }


        return this.users;
    }
    // на всеки потребител ще му излизат индивидуално лично негови потребители .. 
    UserStorage.prototype.getAllUsersForUser = function(userMail) {
        var users = this.users;
        var currentUser = users.find(function(user) {
            return user.email == userMail;
        });

        if (currentUser != undefined) {
            var usersFrList = currentUser.friendsList;
            var reList = currentUser.requestedList;
            var allUsers = usersFrList.concat(reList);

            var filterUsers = users.filter(function(user) {
                return !allUsers.includes(user.email);
            })

            var fullFilterUsers = filterUsers.filter(function(user) {
                return user.email != userMail;
            })

            return fullFilterUsers;

        } else {
            console.log("ObjectSearch go nqma")
        }
    }

    UserStorage.prototype.sendFriendRequest = function(emailEnterA, emailEnterB) {
        var objectA = this.users.find(function(user) { /// send  request
            return user.email == emailEnterA;
        })
        var objectB = this.users.find(function(user) { // recive request
            return user.email == emailEnterB;
        })

        if ((objectA != null) && (objectB != null)) {
            // objectA.requestedList.push(objectB.email);
            objectB.requestedList.push(objectA.email);
        } else {
            console.log("Error send request");
        }
    }

    // emailB => email  na точния емйал от [abv/@abv.bg,asasa@abv.bg], 
    // emailA => meil потребителя на когото преглеждаме листа с send request list -> objA.requestListArrey 
    // objectA = самият потребител с опрделен лист []
    // objectBindex = > index-a на този емайл които ще тре pop-нем
    UserStorage.prototype.showRequestList = function(userEmail) {
        var findUser = this.users.find(function(user) {
            return user.email == userEmail;
        })
        if (findUser != null) {
            var retList = [];
            findUser.requestedList.forEach(function(userEmail) {
                var obj = this.users.find(function(user) {
                    return user.email == userEmail;
                });
                retList.push(obj);
            }, this);

            return retList;
        } else {
            console.log('nqma takyv ..')
        }
    }

    // Когато единият от двамата удобри поканата на другия
    UserStorage.prototype.addFriendInFriendsList = function(sender, receiver) {
        var object1 = this.users.find(function(user) { /// send  request
            return user.email == sender;
        });
        var object2 = this.users.find(function(user) { // recive request
            return user.email == receiver;
        });

        if ((object1 != null) && (object2 != null)) {



            // object1.friendsList.push(object2.email);
            // object2.friendsList.push(object1.email);

            var local = JSON.parse(localStorage.getItem("users"))

            var test1 = local.find(function(user) { /// send  request
                return user.email == sender;
            });
            var test2 = local.find(function(user) { // recive request
                return user.email == receiver;
            });

            test1.friendsList.push(test2.email);
            test2.friendsList.push(test1.email);

            this.users = local;
            localStorage.setItem("users", JSON.stringify(this.users));

        } else {
            console.log(" ... error users")
        }
    }
    UserStorage.prototype.clearRequestList = function(emailEnterA, emailEnterB) {
        var local = JSON.parse(localStorage.getItem("users"))
        var objectA = local.find(function(user) { // намира потребитея с []
            return user.email == emailEnterA;
        });

        var objectBIndex = objectA.requestedList.findIndex(function(email) {
            return email == emailEnterB;
        });

        if ((objectA != null) && (objectBIndex >= 0)) {
            if (objectA.requestedList.length > 0) {
                objectA.requestedList.splice(objectBIndex, 1);
                var test1 = local.find(function(user) { /// send  request
                    return user.email == sender;
                });
                var test2 = local.find(function(user) { // recive request
                    return user.email == receiver;
                });

                test1.friendsList.push(test2.email);
                test2.friendsList.push(test1.email);


                this.users = local;
                localStorage.setItem("users", JSON.stringify(this.users));
            } else {
                console.log("No friends requests")
            }
        } else {
            console.log("Error send request");
        }
    }

    UserStorage.prototype.showFriendsList = function(userEmail) {
        var findUser = this.users.find(function(user) {
            return user.email == userEmail;
        })
        if (findUser != null) {
            var retFrList = [];
            findUser.friendsList.forEach(function(userEmail) {
                var obj = this.users.find(function(user) {
                    return user.email == userEmail;
                });
                retFrList.push(obj);
            }, this);

            return retFrList;
        } else {
            console.log('nqma takyv ..')
        }
    }
    return new UserStorage();
})();