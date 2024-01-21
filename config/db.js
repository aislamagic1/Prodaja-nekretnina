const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.korisnik = sequelize.import(__dirname + '/../modules/Korisnik.js');
db.nekretnina = sequelize.import(__dirname+"/../modules/Nekretnina.js");
db.upit = sequelize.import(__dirname+"/../modules/Upit.js");

//veza 1-n korisnik moze imati vise upita
db.korisnik.hasMany(db.upit,{as:'upitiKorisnika'});

//veza 1-n nekretnina moze imati vise upita
db.nekretnina.hasMany(db.upit,{as:"upitiNekretnine"});

module.exports=db;