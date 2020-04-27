const sequelize = require('../sequelize');



const metaTableInsert = (userID, isProfileComplete, value) => {


   // let userID = userID;
   // let meta = isProfileComplete;
   // let value = value;


        let data = {

            userID : userID,
            meta : isProfileComplete,
            value: value

        }

        sequelize.Meta.create(data).then(function(newMeta) {
        
            if (!newMeta) {                 
                //return done(null, false);
                res.json('Meta wasnt created');
           
            }

            if (newMeta) { 
         
                return true;    
            }

        }).catch(function(err) {
        // print the error details
          console.log(err);
        //  return false
        });


}







const profileStatus = async (userID, metaKey) => {

    console.log("i am looking for meta value with the following "+ userID+ " and " + metaKey);

    console.log("i habe satified the criteris ");

    const findProfile = sequelize.Meta.findOne({

            where: {
                    userID: userID,
                    meta: metaKey
            }
                }).then(function(metaValue) {

                        if (!metaValue) {
                
                            console.log('no value found');
                           // res.json('no value found');
                           return null
                        
                        }
                        

                        if(metaValue){

                            let metaOutput = metaValue.get();

                            let metaReturn = metaOutput.value;

                            console.log("this is the meta value i found "+metaReturn);

                          
                            return metaReturn;

            

                        }
                       
                   //   res.json(metaValue);
                   //     return

                                                        
                }).catch(function(err) {

                      console.log("this Error occurred:", err);

                       return null;

                }); 


             
            let waitOutput = await findProfile;
          // return JSON.stringify(waitOutput);
            return waitOutput;
 
 
 }
 





  
module.exports = {
  
      metaTableInsert : metaTableInsert,
      profileStatus: profileStatus
    
    
    // end of the module export bracket
    }
    










