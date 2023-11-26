let SpisakNekretnina = function () {

    let listaNekretnina = [];
    let listaKorisnika = [];

    let init = function (listaNekretninaPar, listaKorisnikaPar) {
        listaNekretnina = listaNekretninaPar;
        listaKorisnika = listaKorisnikaPar;
    }
    let filtrirajNekretnine = function (kriterij) {
        if(Object.keys(kriterij).length === 0) return listaNekretnina;
        let tipNekretnine = "tip_nekretnine" in kriterij;
        let minKvadratura = "min_kvadratura" in kriterij;
        let maxKvadratura = "max_kvadratura" in kriterij;
        let minCijena = "min_cijena" in kriterij;
        let maxCijena = "max_cijena" in kriterij;
        let filtriraneNekretnine = [];
        for(let key of listaNekretnina){
            if((tipNekretnine && key["tip_nekretnine"] !== kriterij["tip_nekretnine"])
                || (minKvadratura && key["kvadratura"] < kriterij["min_kvadratura"])
                || (maxKvadratura && key["kvadratura"] > kriterij["max_kvadratura"])
                || (minCijena && key["cijena"] < kriterij["min_cijena"])
                || (maxCijena && key["cijena"] > kriterij["max_cijena"])){
                continue;
            }
            filtriraneNekretnine.push(key);
        }
        return filtriraneNekretnine;
    }
    let ucitajDetaljeNekretnine = function (id) {
        for(let key of listaNekretnina){
            if(key["id"] === id) return key;
        }
        return null;
    }

    return { 
        init: init, 
        filtrirajNekretnine: filtrirajNekretnine, 
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};
