
const express = require('express');

const router = express.Router();

const authRoute = require('./authRoute');

const profileRoute = require('./profileRoute');

const bvnRoute = require('./bvnRoute')

const jwt  = require('jsonwebtoken');

const multer  = require('multer');
const config = require('../config/secret');

const stringify = require('json-stringify-safe');



//storage for media files
const DIR = 'public/uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
	// 
	filename: function (req, file, cb) {
		 	  cb(null, file.originalname)
			}
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});





const isAuthenticated = (req, res, next)=> {
 
	// req.cookies['JWT']

	// const reqC = req.headers.cookie;
	// console.log("this is the req cookies "+JSON.stringify(reqC));

//	const tok = req.headers.cookie;

	const bearerHeader = req.headers['authorization'];

	console.log("this is the authorization token "+ stringify(bearerHeader));


	if(typeof bearerHeader !== 'undefined'){

		// split at the space of the access token
		const bearer = bearerHeader.split(' ');

		// get the token from the array
		const bearerToken = bearer[1];


		// verify the token

		jwt.verify(bearerToken, config.apiKey, function (err, decoded) {
			if (err){
				
				console.log('the authentication failed again cos it wasnt decoded'); 
				res.sendStatus(403);
				
				
			};


			if (decoded){

			//	console.log("it was verified "+JSON.stringify(decoded));
				
				//set the token
						
				req.token =  bearerToken
				next();

				
			};

		

	
		});


		



	}else{
		// forbidden
		console.log('the authentication failed again cos the bearer header was undefined'); 
		res.sendStatus(403);
	}

}




// isAuthenticated

router.get('/',  authRoute.homeGET);

router.post('/login', authRoute.loginPOST);

router.post('/register', authRoute.registerPOST);

router.get('/profile', isAuthenticated, profileRoute.profileGET);

//router.get('/profile/:id', profileRoute.profileGETWITHID);


const mediaUpload = upload.single('profilePic');
router.post('/profile',[isAuthenticated, mediaUpload] , profileRoute.profilePOST);

router.get('/bvn/:bvn', bvnRoute.bvnGET);


module.exports = router;