const Sequelize = require('sequelize');
const userModel = require('./models/user');
const metaModel = require('./models/meta');
const controlNumberModel = require('./models/controlNumber');



//cloud connect 
const ho = 'mysql://bb53c866eb5faf:ba8ce82d@us-cdbr-iron-east-01.cleardb.net/heroku_f8a080c180a554a?reconnect=true'

const sequelize = new Sequelize('ntdb', 'bb53c866eb5faf', 'ba8ce82d', {
  host: ho,
  dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },


  });

  //local connect

// const sequelize = new Sequelize('ntdb', 'pmauser', 'password', {
//   host: 'localhost',
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },


//   });

sequelize.authenticate()
	  .then(() => {
	    console.log('Connection has been established successfully.');
	  })
	  .catch(err => {
	    console.error('Unable to connect to the database:', err);
	  });


 const User = userModel(sequelize, Sequelize);
 const Meta = metaModel(sequelize, Sequelize);
 const ControlNumber = controlNumberModel(sequelize, Sequelize);


sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })


  
module.exports = {
  User,
  Meta,
  ControlNumber
}

