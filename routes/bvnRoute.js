
const meta = require('../utility/meta');

const jwtDecode = require('../utility/jwt');

const _ = require('lodash');

const sequelize = require('../sequelize');



//const meta = require('../utility/meta')


const bvnGET = async (req, res, next) => {


    let reqBVN = req.params.bvn
 
    console.log("this is the bvn get route finding "+reqBVN);

   // const checkDBVN = meta.getMeta()

    const userBVN  = sequelize.Meta.findOne({
                where: {
                        value: reqBVN
                }
            }).then(function(meta) {

                if (!meta) {


                return false


                }

                if (meta) {

                    return true

                    }


               

                                                
        }).catch(function(err) {



        }); 


        const outPutOfBVN = await userBVN;

        console.log("this is the BVN "+outPutOfBVN);


        if(outPutOfBVN){
            res.type('application/json');
            return  res.status(200).json({"msg":"duplicate"}); 
           
        }
        if(!outPutOfBVN){
            res.type('application/json');
            return  res.status(201).json({"msg":"non-duplicate"}); 
         
        }



   
    


}


  
  module.exports = {
  
    bvnGET : bvnGET
  
  // end of the module export bracket
  }
  