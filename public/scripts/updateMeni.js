function updatePrijavaLink() {
    PoziviAjax.getKorisnik((err, data) =>{
        if (!err && data) {
            document.getElementById('meniID').innerHTML = `
            <li> <a class="link" href="http://localhost:3000/profil.html" target="_top">Profil</a> </li>
            <li> <a class="link" href="http://localhost:3000/nekretnine.html" target="_top">Nekretnine</a> </li>
            <li> <a class="link" href="http://localhost:3000/detalji.html" target="_top">Detalji</a> </li>
            <li> <a class="link" href="http://localhost:3000/prijava.html" target="_top" id="prijava" onclick="odjavaLink()">Odjava</a> </li>
            `;
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


