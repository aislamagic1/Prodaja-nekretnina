function spojiNekretnine(divReferenca, instancaModula, kriterij) { 

    let spisakNekretnina = instancaModula.filtrirajNekretnine(kriterij);
    let tipNekretnine = kriterij.tip_nekretnine;
    if(tipNekretnine === "Stan"){
        tipNekretnine = "stan-bc";
    } else if(tipNekretnine === "Kuća"){
        tipNekretnine = "kuca-bc";
    }else if(tipNekretnine === "Poslovni prostor"){
        tipNekretnine = "pp-bc";
    }
    divReferenca.innerHTML = "";
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


function loadNekretnine(){
    PoziviAjax.getNekretnine((error, data) => {
        if (error) {
            console.error("Error:", error);
        } else {
            let listaNekretnina = data;       
            let nekretnine = SpisakNekretnina();
            nekretnine.init(listaNekretnina, []);
            spojiNekretnine(kucaDiv, nekretnine, { tip_nekretnine: "Kuća"});
            spojiNekretnine(stanDiv, nekretnine, { tip_nekretnine: "Stan"});
            spojiNekretnine(ppDiv, nekretnine, { tip_nekretnine: "Poslovni prostor"});
        }
    });
}


function filtriranjeClick(){
    let min_cijena = document.getElementById('min_cijena').value || undefined;
    let max_cijena = document.getElementById('max_cijena').value || undefined;
    let min_kv = document.getElementById('min_kv').value || undefined;
    let max_kv = document.getElementById('max_kv').value || undefined;

    let kriterij = {
        tip_nekretnine : "Kuća",
        min_kvadratura : min_kv,
        max_kvadratura : max_kv,
        min_cijena : min_cijena,
        max_cijena : max_cijena
    };

    PoziviAjax.getNekretnine((error, data) => {
        if (error) {
            console.error("Error:", error);
        } else {
            let listaNekretnina = data;       
            let nekretnine = SpisakNekretnina();
            nekretnine.init(listaNekretnina, []);
            spojiNekretnine(kucaDiv, nekretnine, kriterij);
            kriterij["tip_nekretnine"] = "Stan";
            spojiNekretnine(stanDiv, nekretnine, kriterij);
            kriterij["tip_nekretnine"] = "Poslovni prostor";
            spojiNekretnine(ppDiv, nekretnine, kriterij);
        }
    });
}

window.onload = loadNekretnine;


