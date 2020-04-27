const sequelize = require('../sequelize');



const postMeta = async (uID, key, value) => {


   // let uID = uID;
   // let meta = key;
   // let value = value;


        let data = {

            userID : uID,
            meta : key,
            value: value

        }

     let waitOutput =  sequelize.Meta.create(data).then(function(newMeta) {
        
            if (!newMeta) {                 
                //return done(null, false);
             //   res.json('Meta wasnt created');
               return false
           
            }

            if (newMeta) { 
         
               // return true;  
              let metaReturn = newMeta.get();
            //  let metaString = JSON.stringify(metaReturn);
           // let metaString = metaReturn.value;

              // console.log("this si to be returnedc "+JSON.stringify(metaReturn));

              // console.log("this si to be returned valueeeeee "+metaReturn.value);

             // return metaString 
              return true

            }

        }).catch(function(err) {
        // print the error details
          console.log(err);
          return false
        });

        let awaitedOutput = await waitOutput;

        console.log("the awaited to return "+ awaitedOutput);

        return awaitedOutput


}





const getMeta = async (userID, metaKey) => {

    console.log("i am looking for meta value with the following "+ userID+ " and " + metaKey);

    console.log("i habe satified the criteris ");

    const findMeta = sequelize.Meta.findOne({

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


             
            let waitOutput = await findMeta;
          // return JSON.stringify(waitOutput);
            return waitOutput;
 
 
 }
 



 const updateMeta = async (userID, metaKey, metaValue) => {

  console.log("i am looking for meta value with the following "+ userID+ " and " + metaKey);

  console.log("i habe satified the criteris ");

  // update all pugs whose age is 7 to have an adoptedStatus of true
// because we return a promise for an array, destructuring is recommended



    const putMeta = sequelize.Meta.update({value: metaValue}, { where: {userID: userID, meta: metaKey}}).then(function(value){

      console.log("this is the returnsd "+ value)

    }).catch(function(err){

      console.log("this is the error for update "+err)

    });

    let waitOutput = await putMeta;
    // return JSON.stringify(waitOutput);
      return waitOutput;


/*
  const findMeta = sequelize.Meta.findOne({

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


           
          let waitOutput = await findMeta;
        // return JSON.stringify(waitOutput);
          return waitOutput;   */


}







  
module.exports = {
  
    postMeta : postMeta,
    getMeta: getMeta,
    updateMeta: updateMeta
  
  
  // end of the module export bracket
  }
  