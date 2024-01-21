const unosUpitaDiv = document.getElementById('unosUpita');
let username = "";

function unosUpita(){
    PoziviAjax.getKorisnik((err, data) =>{
        if (!err && data) {
            unosUpitaDiv.innerHTML = `<textarea id="tekstUpita" name="w3review" rows="4" cols="50">
            Unesite upit...
            </textarea>
            <button id="myButton" onclick="submitUpitClick()">Submit</button>`;
            username = data.username;
        }
    });
}

function submitUpitClick(){
    let tekstUpita = document.getElementById("tekstUpita").value;

    PoziviAjax.postUpit(nekretninaId, tekstUpita, (error, data) =>{
        if (!error && data) {
            const ulElement = upitiDiv;
            const newLiElement = document.createElement('li');
            newLiElement.innerHTML = `
            <p><b>${username}</b></p>
            <p>${tekstUpita}</p>`;
            ulElement.appendChild(newLiElement);
        }
    });
}

window.addEventListener('load', unosUpita);