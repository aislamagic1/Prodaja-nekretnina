function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    PoziviAjax.postLogin(username, password, (error, data) =>{
        if (error) {
            console.error('Error:', error);
        }else{
            //window.location.href = 'http://localhost:3000/meni.html';
        }
    });
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