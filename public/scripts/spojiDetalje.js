const urlParams = new URLSearchParams(window.location.search);
let nekretninaId = urlParams.get('id');

function spojiDetalje(divOsnovnoRef, divDetaljiRef, divUpitiRef, nekretnina){
    divOsnovnoRef.innerHTML = `<img src="../images/meni.jpg" alt="Slika"><br>
    <p> <b>Naziv</b>: ${nekretnina.naziv}</p><br>
    <p> <b>Kvadratura</b>: ${nekretnina.kvadratura} m2</p><br>
    <p> <b>Cijena</b>: ${nekretnina.cijena} KM</p>`;

    divDetaljiRef.innerHTML = `<table id="tabelaDetalja">
    <tr>
        <th class="kolona-za-padding"><b>Tip grijanja</b>: ${nekretnina.tip_grijanja}</th>
        <th class="kolona-za-padding"><b>Godina izgradnje</b>: ${nekretnina.godina_izgradnje}</th>
    </tr>
    <tr>
        <th class="kolona-za-padding"><b>Lokacija</b>: ${nekretnina.lokacija}</th>
        <th class="kolona-za-padding"><b>Datum objave</b>: ${nekretnina.datum_objave}</th>
    </tr>
    <tr>
        <th colspan="2"><p><b>Opis</b>: ${nekretnina.opis}</p></th>
    </tr>
    </table>`;

    divUpitiRef.innerHTML = `<ul id="vertical-list">`;
    for(let key of nekretnina.upiti){
        divUpitiRef.innerHTML += `<li>
        <p><b>${key.username}</b></p>
        <p>${key.tekst_upita}</p>
    </li>`
    }
    divUpitiRef.innerHTML += `</ul>`;
}

const osnovnoDiv = document.getElementById("osnovno");
const detaljiDiv = document.getElementById("detalji");
const upitiDiv = document.getElementById("upiti");

function loadDetalji(){
    PoziviAjax.getNekretninaById(nekretninaId, (error, data) =>{
        if (error) {
            console.error("Error:", error);
        }else{
            spojiDetalje(osnovnoDiv, detaljiDiv, upitiDiv, data);
        }
    });
}

window.onload = loadDetalji;



