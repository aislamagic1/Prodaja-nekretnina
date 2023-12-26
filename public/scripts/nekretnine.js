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
        <div class="${tipNekretnine}">
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

PoziviAjax.getNekretnine((error, data) => {
    if (error) {
        console.error("Error:", error);
    } else {
        let listaNekretnina = data;       
        let nekretnine = SpisakNekretnina();
        nekretnine.init(listaNekretnina, []);
        spojiNekretnine(kucaDiv, nekretnine, "Kuća");
        spojiNekretnine(stanDiv, nekretnine, "Stan");
        spojiNekretnine(ppDiv, nekretnine, "Poslovni prostor");
    }
});

