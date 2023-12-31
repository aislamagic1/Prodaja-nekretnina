function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    PoziviAjax.postLogin(username, password, (error, data) =>{
        if (error) {
            console.error('Error:', error);
        }else{
            window.location.href = 'http://localhost:3000/meni.html';
        }
    });
}

