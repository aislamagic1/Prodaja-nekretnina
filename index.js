const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const db = require('./config/db.js');
const { create } = require('domain');

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
    db.korisnik.findAll().then(async (korisnici) =>{
        let korisnik = korisnici.find(k => k.username === body.username);
        //console.log(korisnik.ime)
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

        db.korisnik.findOne({where:{username:req.session.username}}).then((korisnik) =>{
            res.status(200).json(korisnik);
        });
    }else{
        res.status(401).json({ greska: "Neautorizovan pristup" });
    }
});

app.post('/upit', (req,res) =>{
    if(req.session.username != null){
        let idKorisnika = 0;
        let body = req.body;
        db.korisnik.findOne({where:{username:req.session.username}}).then((korisnik) =>{
            idKorisnika = korisnik.id;
            db.nekretnina.findOne({where:{id:body.nekretnina_id}}).then((nekretnina) =>{
                if(nekretnina){
                    const noviUpit = {
                        tekst_upita: body.tekst_upita,
                    }
                    
                    db.upit.create(noviUpit).then((createdUpit) =>{
                        korisnik.addUpitiKorisnika(createdUpit).then(() =>{
                            nekretnina.addUpitiNekretnine(createdUpit).then(() =>{
                                res.status(200).json({ poruka: "Upit je uspješno dodan"});
                            })
                        });

                    });

                }else{
                    res.status(400).json({greska:`Nekretnina sa id-em ${body.nekretnina_id} ne postoji`});
                }
            })
        });
    }else{
        res.status(401).json({ greska: "Neautorizovan pristup" });
    }
});

app.put('/korisnik', (req,res) =>{
    if(req.session.username != null){
        let body = req.body;


        db.korisnik.update(body, {where:{username:req.session.username}}).then((korisnik) =>{
            res.status(200).json( {poruka: "Podaci su uspješno ažurirani"} );
        });
    }else{
        res.status(401).json({ greska: "Neautorizovan pristup" });
    }
});

app.get('/nekretnine', (req,res) =>{
    db.nekretnina.findAll().then((nekretnine) =>{
        res.status(200).json(nekretnine);
    })
});

app.post('/marketing/nekretnine', (req,res) =>{
    let body = req.body;
    let nizNekretnina = body.nizNekretnina;
    db.nekretnina.findAll().then((nekretnine) =>{
        for(nekretnina of nekretnine){
            if(nizNekretnina.includes(nekretnina.id)){
                db.nekretnina.update(
                    { pregledi: nekretnina.pregledi + 1 },
                    { where: { id: nekretnina.id } }
                );
            }
        }
        res.status(200).send();
    });
});

app.post('/marketing/nekretnina/:id', (req,res) =>{
    let id_nekretnine = req.params.id;
    db.nekretnina.findByPk(id_nekretnine).then((nekr) =>{
        db.nekretnina.update({klikovi: nekr.klikovi + 1}, {where:{id: id_nekretnine}}).then(() =>{
            res.status(200).send();
        });
    });
/*
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
    });*/
});

app.listen(3000);
