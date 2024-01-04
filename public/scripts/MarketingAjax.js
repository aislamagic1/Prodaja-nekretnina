const MarketingAjax = (() =>{

    function impl_osvjeziPretrage(divNekretnine){
        
    }

    function impl_osvjeziKlikove(divNekretnine){

    }

    function impl_novoFiltriranje(listaFiltriranihNekretnina){
        let ajax = new XMLHttpRequest();
        let nekretnine = {
            nizNekretnina : []
        };
        ajax.onreadystatechange = () =>{
        if(ajax.readyState == 4){
            if(ajax.status == 200){
            }
        }
        }
        for (let nekretnina of listaFiltriranihNekretnina) {
            nekretnine["nizNekretnina"].push(nekretnina["id"]);
        }
        ajax.open("POST", "http://localhost:3000/marketing/nekretnine", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.withCredentials = true;
        ajax.send(JSON.stringify(nekretnine));
    }

    function impl_klikNekretnina(idNekretnine){
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () =>{
        if(ajax.readyState == 4){
            if(ajax.status == 200){
            }
        }
        }
        ajax.open("POST", `http://localhost:3000/marketing/nekretnina/${idNekretnine}`, true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.withCredentials = true;
        ajax.send();
    }

    return{
        osvjeziPretrage: impl_osvjeziPretrage,
        osvjeziKlikove: impl_osvjeziKlikove,
        novoFiltriranje: impl_novoFiltriranje,
        klikNekretnina: impl_klikNekretnina
    };
})();