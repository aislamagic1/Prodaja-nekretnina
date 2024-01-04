const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'sifra',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public'));

app.get('/detalji.html', (req,res) =>{
    res.sendFile('/public/html/detalji.html', {root: __dirname });
});

app.get('/meni.html', (req,res) =>{
    res.sendFile('/public/html/meni.html', {root: __dirname });
});

app.get('/nekretnine.html', (req,res) =>{
    res.sendFile('/public/html/nekretnine.html', {root: __dirname });
});

app.get('/prijava.html', (req,res) =>{
    res.sendFile('/public/html/prijava.html', {root: __dirname });
});

app.get('/profil.html', (req,res) =>{
    res.sendFile('/public/html/profil.html', {root: __dirname });
});

app.post('/login', (req, res) => {
    let body = req.body;
    fs.readFile('public/data/korisnici.json', 'utf-8', async (err, data) => {
        let jsonData = JSON.parse(data);
        let korisnik = jsonData.find(k => k.username === body.username);
        if(korisnik === undefined){
            res.status(401).json({ greska: "Neuspjesna prijava" });
        }else{
            const correctPassword = await bcrypt.compare(body.password, korisnik.password);
            if(correctPassword){
                req.session.username = korisnik.username;
                res.status(200).json({ poruka: "Uspješna prijava" });
            }else{
                res.status(401).json({ greska: "Neuspjesna prijava" });
            }
        }
    });
});

app.post('/logout', (req,res) =>{
    if(req.session.username != null){
        req.session.destroy();
        res.status(200).json({poruka: "Uspješno ste se odjavili"});
    }else{
        res.status(401).json({poruka: "Neautorizovan pristup"});
    }
});

app.get('/korisnik', (req,res) =>{
    if(req.session.username != null){
        fs.readFile('public/data/korisnici.json', 'utf-8', (err,data) =>{
            let jsondata = JSON.parse(data);
            for(korisnik of jsondata){
                if(korisnik.username == req.session.username){
                    res.status(200).json(korisnik);
                    break;
                }
            }
        });
    }else{
        res.status(401).json({ greska: "Neautorizovan pristup" });
    }
});

app.post('/upit', (req,res) =>{
    if(req.session.username != null){
        let idKorisnika = 0;
        let body = req.body;
        fs.readFile('public/data/korisnici.json', 'utf-8', (err,data) =>{
            let jsondata = JSON.parse(data);
            for(korisnik of jsondata){
                if(korisnik.username == req.session.username){
                    idKorisnika = korisnik.id;
                    break;
                }
            }
        });
        fs.readFile('public/data/nekretnine.json', 'utf-8', (err,data) =>{
            let jsonData = JSON.parse(data);
            let nekretnina = jsonData.find(nekretnina => nekretnina.id == body.nekretnina_id);
            if(nekretnina === undefined){
                res.status(400).json({greska:`Nekretnina sa id-em ${body.nekretnina_id} ne postoji`});
            }else{
                const noviUpit = {
                    korisnik_id: idKorisnika,
                    tekst_upita: body.tekst_upita
                }
                nekretnina.upiti.push(noviUpit);
                fs.writeFile('public/data/nekretnine.json', JSON.stringify(jsonData, null, 2), (err) =>{
                    res.status(200).json({ poruka: "Upit je uspješno dodan"});
                });
            }
        });
    }else{
        res.status(401).json({ greska: "Neautorizovan pristup" });
    }
});

app.put('/korisnik', (req,res) =>{
    if(req.session.username != null){
        let body = req.body;
        fs.readFile('public/data/korisnici.json', 'utf-8', async (err,data) =>{
            let jsonData = JSON.parse(data);
            for(korisnik of jsonData){
                if(korisnik.username == req.session.username){
                    korisnik.ime = body.ime;
                    korisnik.prezime = body.prezime;
                    korisnik.username = body.username;
                    korisnik.password = await bcrypt.hash(body.password, 10);
                    break;
                }
            }
            fs.writeFile('public/data/korisnici.json', JSON.stringify(jsonData, null, 2), (err) =>{
                res.status(200).json( {poruka: "Podaci su uspješno ažurirani"} );
            });
        });
    }else{
        res.status(401).json({ greska: "Neautorizovan pristup" });
    }
});

app.get('/nekretnine', (req,res) =>{
    fs.readFile('public/data/nekretnine.json', 'utf-8', (err,data) =>{
        res.status(200).json(JSON.parse(data));
    });
});

app.post('/marketing/nekretnine', (req,res) =>{
    let body = req.body;
    let nizNekretnina = body.nizNekretnina;
    fs.readFile('public/data/brojPretragaKlikova.json', 'utf-8', (err,data) =>{
        let jsonData = JSON.parse(data);
        for(nekretnina of jsonData){
            if(nizNekretnina.includes(nekretnina.nekretnina_id)){
                nekretnina.pregledi++;
                nizNekretnina = nizNekretnina.filter(id => id !== nekretnina.nekretnina_id);
            }
        }
        for(i in nizNekretnina){
            let novaNekretnina = {
                nekretnina_id : nizNekretnina[i],
                pregledi : 1,
                klikovi : 0
            }
            jsonData.push(novaNekretnina);
        }
        fs.writeFile('public/data/brojPretragaKlikova.json', JSON.stringify(jsonData, null, 2), (err) =>{
            res.status(200).send();
        });
    });
});

app.post('/marketing/nekretnina/:id', (req,res) =>{
    let id = req.params.id;
    fs.readFile('public/data/brojPretragaKlikova.json', 'utf-8', (err,data) =>{
        let jsonData = JSON.parse(data);
        for(nekretnina of jsonData){
            if(id == nekretnina.nekretnina_id){
                nekretnina.klikovi++;
            }
        }
        fs.writeFile('public/data/brojPretragaKlikova.json', JSON.stringify(jsonData, null, 2), (err) =>{
            res.status(200).send();
        });
    });
});

app.listen(3000);
