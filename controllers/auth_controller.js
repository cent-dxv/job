const Users = require("../model/user");
const { BadRequestError, UnauthenticatedError } = require("../errors");

require("dotenv").config();

const Register = async (req, res) => {
  // const { name, email, password } = req.body;
  // console.log(password);
  // const salt = await bcryptjs.genSalt(10)
  // const hasedPassword = await bcryptjs.hash(password,salt)

  // if(!name || !email || !password){
  //   throw new BadRequestError('user name or email and passoward are required ')
  // }

  // const {_id,name:username,email:useremail} = await user.create({...req.body})
  const user = await Users.create({ ...req.body });

  // console.log(req.body);
  const token = user.createJWT();
  res.json(token);
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("user name or email and passoward are required ");
  }
  const user = await Users.findOne({ email })


  const check_pass = user && await user.CheckPassword(password);

  if (!user || !check_pass) {
    throw new UnauthenticatedError("Invalid credentials ");
  }
  const token = user.createJWT();
  // console.log(new_user);
  res.json({token:token});
};

module.exports = { Login, Register };
