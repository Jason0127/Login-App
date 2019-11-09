const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config").get(process.env.NODE_ENV);
const saltI = 10;

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 2048
    },

    password: {
      type: String,
      required: true,
      maxlength: 2048
    },

    firstName: {
      type: String,
      required: true,
      maxlength: 2048
    },

    lastName: {
      type: String,
      required: true,
      maxlength: 2048
    },

    token: String
  },
  { timestamps: true }
);

userSchema.pre("save", async function() {
  const user = this;
  if (user.isModified("password")) {
    const salt = bcrypt.genSaltSync(saltI);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }
});

userSchema.methods.comparePassword = function(candidatePassword) {
  let user = this;
  let isMatch = bcrypt.compareSync(candidatePassword, user.password);

  return isMatch;
};

userSchema.methods.generateToken = async function() {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), config.SECRET);
  user.token = token;
  await user.save();
  return user.token;
};

userSchema.statics.findByToken = function(token, cb) {
  let user = this;
	console.log('asdasdasd')
  jwt.verify(token, config.SECRET, (err, decode) => {
    user.findOne({ _id: decode, token: token }, (err, user) => {
			if (err) cb(err);
			
			cb(null, user);
			
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
