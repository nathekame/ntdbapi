const sequelize = require('../sequelize');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config/secret');
const jwt  = require('jsonwebtoken');

const metaUtility = require('../utility/meta');

const controlNumberUtility = require('../utility/controlNumber');

//const getMeta = require('../utility/meta');



const _ = require('lodash');



const homeGET = async (req, res, next) => {

    console.log("i got here to host the local ");
    res.type('application/json');
   return res.status(200); 
}

const loginPOST = async (req, res, next) =>{

    const email = req.body.email;
    const password = req.body.password;

    console.log("this is the posted email "+ email);

    console.log("this is the posted password"+ password);


//started from here

    var isValidPassword = function(userpass, password) {

             return bcrypt.compareSync(password, userpass);

        }



    
    let  loginUser = sequelize.User.findOne({

        where: {
                    email: email
                }

        }).then(function(user) {

                if (!user) {
    
						// 404 not found
					console.log('no user found');
				//	res.json('no user found');
					res.type("application/json")
	 				return	res.status(200).json({msg:'User Not found'})
							

                        

                }

                if (!isValidPassword(user.password, password)) {
                
                 //   console.log('invalid password');
                //	res.json('invalid password');
					res.type("application/json")
	 				return	res.status(200).json({msg:'Password Mismatch'});

                          


                } 

                

                let userinfo = user.get();

          

                const userDetailsToReturn = {
            
                    userID : userinfo.id,
                    email : userinfo.email

                }
        
            //	res.json(userDetailsToReturn);
        //		res.render('jwt', {userToken: token});


            //	return userinfo;
                return userDetailsToReturn;
            //	return token;
        //	return


                                                
        }).catch(function(err) {

                console.log("this Error occurred:", err);

        }); 





        let waitOutput = await loginUser;

        let uid = waitOutput.userID;
        let metaKey = "isProfileComplete";

        let roleKey = "role"



    //	let profileStatus = await utility.profileStatus(uid, metaKey);

        let metaOutput = await metaUtility.getMeta(uid, metaKey);

      

        let roleMetaOutput = await metaUtility.getMeta(uid, roleKey);



        console.log("this is the meta "+metaOutput);


    // add the value of the profile complete status
        waitOutput["isProfileComplete"] = metaOutput; 
    ; 
        waitOutput["role"] = roleMetaOutput;

    //	waitOutput["userID"] = 3;
      //  obj["key3"] = "value3";



    const token = jwt.sign(waitOutput, config.apiKey);

    const newUserObj = {
    //	userID: waitOutput.userID,
        userToken : token
    
        };

    




      console.log("the fimnal object from the PROMISE "+ JSON.stringify(waitOutput));

      console.log("the fimnal object from the PRO NEW USEER OBJECT "+ JSON.stringify(newUserObj));


        res.type('application/json');
      return  res.status(201).json(newUserObj); 


    //return newUserObj




}



const registerPOST = async (req, res, next) => {

console.log("i got here for the register logic")

    const email = req.body.email;
    const pword = req.body.password;       
	const controlNumber = req.body.controlNumber;   
	const role = "user";

	console.log("this is the entered email "+email);

	console.log("this is the entered file number "+controlNumber);



	const generateHash = function(pword) {
		return bcrypt.hashSync(pword, bcrypt.genSaltSync(8), null);
	}


	const checkControl = await controlNumberUtility.controlNumberCheck(controlNumber);

	const checkControlDuplicate = await controlNumberUtility.CNDuplicateCheck(controlNumber);



	if(checkControl === false){

		console.log("the control number was not found ")

		res.type("application/json")
	    return	res.status(200).json({msg:'Control Number Not Found'});

	}

	if (checkControlDuplicate === true) {

		console.log("the control number has been used by another person ")

		res.type("application/json")
	    return	res.status(200).json({msg:'Control Number Has Been Used By Another User'});
		
	}

	

	



		let dataEntry =	sequelize.User.findOne({ where: {email: email} }).then(function(user) {
							
						if (user)  {

							//	return done(null, false, {message: 'That email is already taken'});
							console.log('user taken already');

						//	res.json('user taken already');
							//	res.type("application/json")
							// return	res.status(404).json({code:603, msg:'Email Already Taken'});  
									res.type("application/json")
									return	res.status(200).json({msg:'Email Already Taken'}); 
							//	return true;
								//res.json({userToken : token});
				
								} else {

							//		var username = req.body.username;
									const email = req.body.email;
									
								//	console.log('this is from squelize section'+ email);
					
									const userPassword = generateHash(pword);
								

										var data = {
												//	username: username,
															email: email,
															password: userPassword,
														//	role: role
														//	seatID: sID.id
															//  firstname: req.body.firstname,
															//  lastname: req.body.lastname
															};
							
									

						let testReturn = sequelize.User.create(data).then(function(newUser) {

											if (!newUser) { 
												
												//return done(null, false);
											//	res.json('user wasnt created');
												res.type("application/json")
	   											return	res.status(200).json({msg:'Error Creating User'});
  

											//	return false;
											
											}
					
											if (newUser) { 


												return newUser
											
											}
					
									}).catch(function(err) {
										// print the error details
										console.log(err, req.body.email);

										console.log("this error occoured in it "+err);

								});

								return testReturn



							

							} 

						}).catch(function(err) {
							// print the error details
							console.log(err, req.body.email);

							console.log("this error occoured in it "+err);

					});


					let awaitingOut = await dataEntry

					console.log("this is what was returned by the promisss "+JSON.stringify(awaitingOut));

					let uID = awaitingOut.id;
					let key = "role";
					let value = role;

				//	console.log("this is the role value going "+ value);

					let pMeta = await metaUtility.postMeta(uID, key, value);

					let profileKey = "isProfileComplete";
					let profileValue = "0";
					let profileMeta = await metaUtility.postMeta(uID, profileKey, profileValue);

				//	let profileStepKey = "profileStep";
				//	let profileStepValue = 1;
                //    let profileStepMeta = await postMeta.postMeta(uID, profileStepKey, profileStepValue);
                    
                    let controlNumberKey = "controlNumber";
					let controlNumberValue = controlNumber;
					let controlNumberMeta = await metaUtility.postMeta(uID, controlNumberKey, controlNumberValue);


					awaitingOut["role"] = pMeta;
                    awaitingOut["isProfileComplete"] = profileMeta;
                    awaitingOut["controlNumber"] = controlNumberMeta;
					



					console.log("the new output "+ JSON.stringify(awaitingOut));

					const awaitingOutObj = {
						userID: awaitingOut.id,
						email : awaitingOut.email,
						role : pMeta,
						isProfileComplete: 0
					

						};



					const token = jwt.sign(awaitingOutObj, config.apiKey);

					let toReturn = {

					//	userID : uID,
						userToken : token

					}

					   res.type("application/json");
				return	res.status(201).json(toReturn); 
				
	

}

module.exports = {
  
    homeGET : homeGET,
    loginPOST : loginPOST,
    registerPOST: registerPOST


  
  // end of the module export bracket
  }