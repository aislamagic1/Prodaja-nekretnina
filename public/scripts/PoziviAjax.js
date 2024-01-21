const PoziviAjax = (() => {

    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null

    // vraća korisnika koji je trenutno prijavljen na sistem
    function impl_getKorisnik(fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () =>{
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                let jsonRez = JSON.parse(ajax.responseText);
                fnCallback(null, jsonRez);
            } else {
                fnCallback(ajax.statusText, null);
            }
        }
        }
        ajax.open("GET", "http://localhost:3000/korisnik", true);
        ajax.withCredentials = true;
        ajax.send();
    }

    // ažurira podatke loginovanog korisnika
    function impl_putKorisnik(noviPodaci, fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () =>{
            if(ajax.status == 200){
                fnCallback(null, {});
            } else {
                fnCallback(ajax.statusText, null);
            }
        }
        ajax.open("PUT", "http://localhost:3000/korisnik", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.withCredentials = true;
        ajax.send(JSON.stringify(noviPodaci));
    }

    // dodaje novi upit za trenutno loginovanog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        const noviPodaci = {
            nekretnina_id : nekretnina_id,
            tekst_upita : tekst_upita
        };
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () =>{
            if(ajax.readyState == 4){
                if(ajax.status == 200){
                    fnCallback(null, noviPodaci);
                }else{
                    fnCallback(ajax.statusText, null);
                }
            }
        }
        ajax.open("POST", "http://localhost:3000/upit", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.withCredentials = true;
        ajax.send(JSON.stringify(noviPodaci));
    }

    function impl_getNekretnine(fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () =>{
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                let jsonRez = JSON.parse(ajax.responseText);
                fnCallback(null, jsonRez);
            } else {
                fnCallback(ajax.statusText, null);
            }
        }
        }
        ajax.open("GET", "http://localhost:3000/nekretnine", true);
        ajax.withCredentials = true;
        ajax.send();
    }

    function impl_postLogin(username, password, fnCallback) {
        const korisnikPodaci = {
            username : username,
            password : password
        };
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () =>{
            if(ajax.readyState == 4){
                if(ajax.status == 200){
                    fnCallback(null, korisnikPodaci);
                }else{
                    fnCallback(ajax.statusText, null);
                }
            }
        }
        ajax.open("POST", "http://localhost:3000/login", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.withCredentials = true;
        ajax.send(JSON.stringify(korisnikPodaci));
    }

    function impl_postLogout(fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () =>{
            if(ajax.readyState == 4){
                if(ajax.status == 200){
                    fnCallback(null, null);
                }else{
                    fnCallback(ajax.statusText, null);
                }
            }
        }
        ajax.open("POST", "http://localhost:3000/logout", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.withCredentials = true;
        ajax.send();
    }

    function impl_getNekretninaById(nekretnina_id, fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () =>{
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                let jsonRez = JSON.parse(ajax.responseText);
                fnCallback(null, jsonRez);
            } else {
                fnCallback(ajax.statusText, null);
            }
        }
        }
        ajax.open("GET", `http://localhost:3000/nekretnina/${nekretnina_id}`, true);
        ajax.withCredentials = true;
        ajax.send();
    }

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine,
        getNekretninaById: impl_getNekretninaById
    };
})();


