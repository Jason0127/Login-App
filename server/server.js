const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cookieParser());

const { User } = require("./model/user-model");
const {auth} = require("./middleware/auth")

mongoose.connect(config.DATABASE, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Get Req

app.get('/api/auth', auth, (req, res) =>{

	res.json({
		isAuth: true
	})

})

// Post Req

app.post("/api/addUser", async (req, res) => {
  try {
    const user = await new User(req.body);
	let userCheck = await user.save();
	console.log(userCheck + 'asdasd')
    res.json({
      success: true,
      user
    });
  } catch (error) {
	return res.json({
		error: true,
		message: error.message
	})
  }
});

// Log User in
app.post("/api/login", async (req, res) => {
  try {
    let user = await User.findOne({

      username: req.body.username
			
		});

		if(!user){
			return res.json({
				isAuth: false,
				message: 'User Not Found'
			})
		}

		let isMatch = user.comparePassword(req.body.password)

		if(!isMatch){
			return res.json({
				isAuth: false,
				message: 'User Not Found'
			})
		}

		let token = await user.generateToken();
		res.cookie('Auth', token).json({
			success: true,
			user
		})

		// res.json({
		// 	success: true,
		// 	user
		// });
		
  } catch (error) {
		console.log(error)
		res.json({
			error: true,
			message: error.message
		})

	}
});

let port = 2020;

app.listen(port, err => {
  if (err) return console.error(err);
  console.log(`Server Is Runnig At port ${port}`);
});
