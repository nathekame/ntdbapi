const sequelize = require('../sequelize');

const meta = require('./meta');






const getProfile = async (id) => {



      const UserInfo  = sequelize.User.findOne({
                    where: {
                            id: id
                    }
                }).then(function(user) {

                    if (!user) {


                    return false


                    }

                    if (user) {

                        let dUserDetails = user.get();				   

                        
                        return dUserDetails

                        }


                    return true

                                                    
            }).catch(function(err) {



            }); 


            let UserIn = await UserInfo

            let newUserDetails = {};


            let firstName = await meta.getMeta(UserIn.id, "firstName")
            let lastName = await meta.getMeta(UserIn.id , "lastName")
            let gender = await meta.getMeta(UserIn.id , "gender")
            let unit = await meta.getMeta(UserIn.id , "unit")
            let role = await meta.getMeta(UserIn.id , "role")
            let mobileNumber = await meta.getMeta(UserIn.id , "mobileNumber")
            let profilePic = await meta.getMeta(UserIn.id , "profilePic")

            // let caseCount = await casesCount.myCasesCount(UserIn.id)
            // let actionCount = await actionsCount.myActionsCount(UserIn.id)
           
            newUserDetails["email"] = UserIn.email
            newUserDetails["timeOfReg"] = UserIn.createdAt
            newUserDetails["firstName"] = firstName
            newUserDetails["lastName"] = lastName
            newUserDetails["gender"] = gender
            newUserDetails["unit"] = unit
            newUserDetails["role"] = role
            newUserDetails["mobileNumber"] = mobileNumber
            newUserDetails["profilePic"] = profilePic	
            // newUserDetails["caseCount"] = caseCount
            // newUserDetails["actionCount"] = actionCount
            


            console.log("thefinal details of the user "+JSON.stringify(newUserDetails));

            return newUserDetails;







}







  
module.exports = {
  
    getProfile : getProfile
   
  
  // end of the module export bracket
  }
  