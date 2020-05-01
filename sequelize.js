const Sequelize = require('sequelize');
const userModel = require('./models/user');
const metaModel = require('./models/meta');
const controlNumberModel = require('./models/controlNumber');

var fs = require('fs');
var csv = require('csv');

//cloud connect 
// const ho = 'us-cdbr-iron-east-01.cleardb.net'

// const sequelize = new Sequelize('heroku_f8a080c180a554a', 'bb53c866eb5faf', 'ba8ce82d', {
//   host: ho,
//   dialect: 'mysql',

//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     },


//   });

  //local connect

const sequelize = new Sequelize('ntdb', 'pmauser', 'password', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },


  });

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


// extra code to add data to db at build time


//var Device = require('./models').Device

var input = fs.createReadStream('./csv/test.csv');
var parser = csv.parse({
  delimiter: ',',
  columns: true
})


var transform = csv.transform(function(row) {
  var resultObj = {
    controlNumber: row['CODE']
    // imei: row['IMEI#'],
    // serial_number: row['S/N #'],
    // meid: row['MEID#'],
    // esn: row['ESN#'],
    // mac_address: row['MAC#'],
    // exfactory_date: row['Ex-Factory date'],
    // po_number: row['PO#'],
    // packaging_number: row['CN#'] ,
    // sw_version: row['Software version'],
    // fw_version: row['Hardware version'],
    // hw_version: row['S/N #'].slice(2, 4)
  }
  ControlNumber.create(resultObj)
    .then(function() {
      console.log('Control Number Created')
    })
    .catch(function(err) {
      console.log('Error encountered: ' + err)
    })
})

input.pipe(parser).pipe(transform)













sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })


  
module.exports = {
  User,
  Meta,
  ControlNumber
}

