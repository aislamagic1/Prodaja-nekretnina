function updatePrijavaLink() {
    PoziviAjax.getKorisnik((err, data) =>{
        if (!err && data) {
            document.getElementById('prijava').innerText = 'Odjava';
        }else{
            console.log(err);
        }
    });
}

function odjavaLink(){
    if(document.getElementById('prijava').innerText === 'Odjava'){
        PoziviAjax.postLogout((err, data) =>{
            if (err) {
                console.error('Error:', error);
            }
        });
    }
}

window.onload = updatePrijavaLink;


