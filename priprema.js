const db = require('./config/db.js');
db.sequelize.sync({force:true});