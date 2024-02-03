
var backEndUrl = "https://localhost:7134";
window.onload = function () {
    fetch(`${backEndUrl}/Users`)
        .then(response => {
            if (response.status === 401) {
                window.location.href = '/login';
            }
        })
        .catch(error => console.error('Error:', error));
};

console.log("config.js");



