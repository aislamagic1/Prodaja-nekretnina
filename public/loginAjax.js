function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:3000/login", true);
    ajax.setRequestHeader("Content-Type", "application/json");

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            let meni = document.getElementById("meni").contentDocument;
        let prijavaLink = meni.getElementById("prijava");
        let response = JSON.parse(ajax.responseText);
        if (response.poruka === "Uspješna prijava") {
        // Change Prijava to Odjava
        prijavaLink.innerHTML = "Odjava";
        } else {
        // Change Odjava to Prijava
        prijavaLink.innerHTML = "Prijava";
        prijavaLink.onclick = function() {
            ajaxLoadPage('prijava.html');
        };
        }
        }
    };
    let data = JSON.stringify({
        username: username,
        password: password
    });
    ajax.send(data);
}

function ajaxLoadPage(page) {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", page, true);
    ajax.onreadystatechange = () =>{
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("container").innerHTML = ajax.responseText;
        }else{
            console.error('Error loading page:', ajax.status, ajax.statusText);
        }
    };
    ajax.send();
}