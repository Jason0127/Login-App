const {User} = require('../model/user-model');

async function auth(req, res, next){
	let token = req.cookies.Auth;


	User.findByToken(token, (err, user) =>{
		if(err) throw err;

		if(!user) return res.json({
			error: true
		})
		req.user = user;

		
		req.token = user.token;

		next();
	})

}

module.exports = {auth};