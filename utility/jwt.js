const jwt  = require('jsonwebtoken');
const config = require('../config/secret');


const jwtDecode = (token) => {

       const decode = jwt.verify(token, config.apiKey, function (err, decoded) {
                if (err){
                    
                    console.log('the authentication failed again cos it wasnt decoded'); 
                    return err
                    
                    
                };


                if (decoded){
                    
                    //set the token
                    console.log("this na the deoded wen i no dey fit see sooooOOOO "+JSON.stringify(decoded));
                    return decoded

                    
                };

        
        
        });
        
        return decode
        

}



  
module.exports = {
  
      jwtDecode : jwtDecode
    
    
    // end of the module export bracket
    }
    










