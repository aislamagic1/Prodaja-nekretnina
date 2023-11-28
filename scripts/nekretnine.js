function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) { 

    let spisakNekretnina = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
    let tipNekretnine = tip_nekretnine;
    if(tipNekretnine === "Stan"){
        tipNekretnine = "stan-bc";
    } else if(tipNekretnine === "Kuća"){
        tipNekretnine = "kuca-bc";
    }else if(tipNekretnine === "Poslovni prostor"){
        tipNekretnine = "pp-bc";
    }
    for(let key of spisakNekretnina){
        divReferenca.innerHTML += `
        <div id="${tipNekretnine}">
            <img src="" alt="Slika" /><br>
            <p class="nazivNekretnine">Naziv nekretine: ${key["naziv"]}</p>
            <p class="kvadratura">Kvadratura: ${key["kvadratura"]}</p>
            <p class="cijena">Cijena: ${key["cijena"]}</p>
            <div class="detaljiDugme">
                <input type="button" value="Detalji">
            </div>
        </div>`;
    }
}

const stanDiv = document.getElementById("stan");
const kucaDiv = document.getElementById("kuca");
const ppDiv = document.getElementById("pp");

const listaNekretnina = [{ 
    id: 1, 
    tip_nekretnine: "Kuća", 
    naziv: "Kuca u Sarajevu", 
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
    tip_nekretnine: "Kuća",
    naziv: "Kuca u Sarajevu",
    kvadratura: 30,
    cijena: 150000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{ korisnik_id: 2, tekst_upita: "Integer tincidunt."
    } ]
    },{ 
    id: 3, 
    tip_nekretnine: "Stan", 
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
    }]},
{ 
    id: 4, 
    tip_nekretnine: "Poslovni prostor", 
    naziv: "Mali poslovni prostor", 
    kvadratura: 18, cijena: 100000, 
    tip_grijanja: "plin", 
    lokacija: "Novo Sarajevo", 
    godina_izgradnje: 2019, 
    datum_objave: "01.10.2023.", 
    opis: "Sociis natoque penatibus.", 
    upiti: [{ korisnik_id: 1, tekst_upita: "Nullam eu pede mollis."}
    ,{
    korisnik_id: 2, tekst_upita: "Phasellus viverra nulla."
    }]}]

const listaKorisnika = [{ id: 1, ime: "Neko", prezime: "Nekic", username: "username1",
}, {
id: 2, ime: "Neko2", prezime: "Nekic2", username: "username2",
}]

let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina, listaKorisnika);
spojiNekretnine(kucaDiv, nekretnine, "Kuća");
spojiNekretnine(stanDiv, nekretnine, "Stan");
spojiNekretnine(ppDiv, nekretnine, "Poslovni prostor");
