const jwt  = require('jsonwebtoken');
const config = require('../config/secret');
const sequelize = require('../sequelize');


const controlNumberCheck = async (controlNumber) => {


    

    const findControlNumber = sequelize.ControlNumber.findOne({

            where: {
                controlNumber: controlNumber
            }
                }).then(function(cn) {

                        if (!cn) {
                
                            console.log('no value found');
                           // res.json('no value found');
                           return false
                        
                        }
                        

                        if(cn){

                            // let metaOutput = metaValue.get();

                            // let metaReturn = metaOutput.value;

                            // console.log("this is the meta value i found "+metaReturn);

                          
                            return true;

            

                        }
                       
                   //   res.json(metaValue);
                   //     return

                                                        
                }).catch(function(err) {

                      console.log("this Error occurred:", err);

                       return null;

                }); 


             
            let waitOutput = await findControlNumber;
          // return JSON.stringify(waitOutput);
            return waitOutput;

    
        

}



  
module.exports = {
  
      controlNumberCheck : controlNumberCheck
    
    // end of the module export bracket
    }
    










