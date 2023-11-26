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

const listaNekretnina = [{ 
    id: 1, 
    tip_nekretnine: "Poslovni prostor", 
    naziv: "Useljiv stan Sarajevo", 
    kvadratura: 18, cijena: 100000, 
    tip_grijanja: "plin", 
    lokacija: "Novo Sarajevo", 
    godina_izgradnje: 2019, 
    datum_objave: "01.10.2023.", 
    opis: "Sociis natoque penatibus.", 
    upiti: [{ korisnik_id: 1, tekst_upita: "Nullam eu pede mollis."}
    ,{
    korisnik_id: 2, tekst_upita: "Phasellus viverra nulla."
    }]}, {
    id: 2,
     tip_nekretnine: "Poslovni prostor",
      naziv: "Mali poslovni prostor",
       kvadratura: 30,
        cijena: 150000,
         tip_grijanja: "struja",
          lokacija: "Centar",
           godina_izgradnje: 2005,
            datum_objave: "20.08.2023.",
             opis: "Magnis dis parturient montes.",
              upiti: [{ korisnik_id: 2, tekst_upita: "Integer tincidunt."
} ]
}]

const listaKorisnika = [{ id: 1, ime: "Neko", prezime: "Nekic", username: "username1",
}, {
id: 2, ime: "Neko2", prezime: "Nekic2", username: "username2",
}]

const kriterij = {
    tip_nekretnine: "Poslovni prostor",
    min_kvadratura: 25,
    max_cijena: 180000
}

let test = SpisakNekretnina();
test.init(listaNekretnina, listaKorisnika);
let result = test.filtrirajNekretnine(kriterij);
console.log(result);
