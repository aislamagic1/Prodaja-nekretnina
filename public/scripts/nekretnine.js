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
            <input type="button" value="Detalji" onclick="detaljiClick(${key.id})" data-id="${key.id}">
            </div>
            <div id="otvori-detalje-${key.id}" style="display: none;">
            <p class="detalji-paragraph">Lokacija: ${key.lokacija}</p>
            <p class="detalji-paragraph">Godina izgradnje: ${key.godina_izgradnje}</p>
            <input type="button" value="Otvori detalje" onclick="otvoriDetaljeClick(${key.id})">
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
            let spisakFiltriranihNekretnina = [];
            let nekretnine = SpisakNekretnina();
            nekretnine.init(listaNekretnina, []);
            spojiNekretnine(kucaDiv, nekretnine, kriterij);
            let filtriraneNekretnine1 = nekretnine.filtrirajNekretnine(kriterij);

            kriterij["tip_nekretnine"] = "Stan";
            spojiNekretnine(stanDiv, nekretnine, kriterij);
            let filtriraneNekretnine2 = nekretnine.filtrirajNekretnine(kriterij);

            kriterij["tip_nekretnine"] = "Poslovni prostor";
            spojiNekretnine(ppDiv, nekretnine, kriterij);
            let filtriraneNekretnine3 = nekretnine.filtrirajNekretnine(kriterij);

            spisakFiltriranihNekretnina = filtriraneNekretnine1.concat(filtriraneNekretnine2, filtriraneNekretnine3);
            
            MarketingAjax.novoFiltriranje(spisakFiltriranihNekretnina);
        }
    });
}

let currentDetaljiId = null;

function detaljiClick(id){
    MarketingAjax.klikNekretnina(id);
    let detaljiParagraph = document.getElementById(`otvori-detalje-${id}`);

    if (currentDetaljiId !== null) {
        let currentDetalji = document.getElementById(`otvori-detalje-${currentDetaljiId}`);
        currentDetalji.style.display = 'none';
    }

    if (detaljiParagraph.style.display === 'none' && currentDetaljiId != id) {
        detaljiParagraph.style.display = 'block';
    } else {
        detaljiParagraph.style.display = 'none';
    }

    if (detaljiParagraph.style.display === 'none') {
        currentDetaljiId = null;
    } else {
        currentDetaljiId = id;
    }
}

function otvoriDetaljeClick(id){
    window.location.href = `http://localhost:3000/detalji.html?id=${id}`;
}


window.onload = loadNekretnine;


