
const meta = require('../utility/meta');

const jwtDecode = require('../utility/jwt');

const _ = require('lodash');


const profileGET = async (req, res, next) => {

   return res.status(200)

}

const profilePOST = async (req, res, next) =>{

    const profilePicStr = req.file.path

   
      //res.render("getjwt");

    //  console.log("this is the files "+req.files);

      console.log("this is the req body for files "+JSON.stringify(req.file));

    //  console.log("this is the req body for files profile pic "+req.files.profilePic[0].path);

    //  console.log("this is the req body for files id card file  "+req.files.idCardFile[0].path);



    //  const profilePic = JSON.stringify(req.files['profilePic'][0].path);
    //  const idCardFile = JSON.stringify(req.files['idCardFile'][0].path);

   //  console.log("this is the req body for body "+JSON.stringify(req.body));


      // profile complete and profile step need ot be update

 //     console.log("i got here for the profile request whole >>>>bnody post list "+ JSON.stringify(req.body));

     // console.log("i got here for the profile request bnody post list "+ JSON.stringify(req.body.profile));
      let filesObj = req.file;

      let filesCheck = _.isEmpty(filesObj); // true

    

      let profileObj = req.body;
      if(!filesCheck){
            console.log("yes it has files");
            if(filesObj.path !== undefined){
                profileObj.profilePicUrl = profilePicStr
            }
       
       
        }
      

     // let userToken = req.body.auth.userToken;
     let userToken = req.token;
    // console.log("this is the request token "+userToken);

     const decodedToken = jwtDecode.jwtDecode(userToken);


      let uID = decodedToken.userID;

  //  let profileMeta = await postMeta.postMeta(uID, profileKey, profileValue);


      const reqEntries = Object.entries(profileObj)


    try {


      for (const [key, value] of reqEntries) {
     
                        if(key === "profileStep" || key === "isProfileComplete"){
               
                                           let upd = await meta.updateMeta(uID, key, value);   
                                           if(upd === false){
                                            res.json("error");
                                               break
                                              
                                           }                                                    
                                        //    res.status(500)
                        }else{
    
                            if(value !== ""){

                                    let upd = await meta.postMeta(uID, key, value);
                                        if(upd === false){
                                            res.json("error");
                                            break
                                        }              
                                     //   res.status(500)
                            }
    
                        }
    
              }

         //     res.json("success");
         //the resource was created successfully
                    res.type("application/json")
              return res.status(201).json("success");

        
    } catch (error) {

        //console.log("an error occurer in the loop ooo "+error);
          // res.status(604)
          // return res.status(500).send()
          // the request is successfull but the endpoint code cught an error
          return res.status(200).send("error");


        
    }



  
  
}
  
  module.exports = {
  
    profileGET : profileGET,
    profilePOST : profilePOST

  
  // end of the module export bracket
  }
  