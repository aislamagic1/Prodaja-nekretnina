function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:3000/login", true);
    ajax.setRequestHeader("Content-Type", "application/json");

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            window.location.href = "/html/meni.html";
            document.getElementById('prijava').innerHTML = "Odjava";
        }
    };
    let data = JSON.stringify({
        username: username,
        password: password
    });
    ajax.send(data);
}