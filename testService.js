function load() {
    return new Promise(function (resolve, reject) {
        const HTTP_OK = 200;
        var xhr;

        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject();
        }

        xhr.open('GET', '/users.json', true);
        xhr.send(null);

        xhr.addEventListener('load', function () {

            if (xhr.status >= HTTP_OK && xhr.status < 300) {
                // console.log(xhr.responseText)
                var usersData = JSON.parse(xhr.responseText);
                resolve(usersData);
            } else {
                reject(xhr.statusText);
            }
        });
    });
}
