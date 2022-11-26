const { User } = require("../models/userModel");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const registration = async (email, password, verificationToken) => {
  const user = new User({ email, password, verificationToken });
  await user.save();
};
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || (await !bcrypt.compare(password, user.password))) {
    throw new Unauthorized("Email or password is wrong");
  }
  if (!user.verify) {
    throw new Unauthorized("Please, verify your email");
  }
  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  user.token = token;
  await User.findByIdAndUpdate(user._id, user);
  return token;
};

const send = async (email, token) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const url = `localhost:3000/api/users/verify/${token}`;
  const msg = {
    to: email, // Change to your recipient
    from: "stefan090304@gmail.com", // Change to your verified sender
    subject: "Verify!",
    html: `${url} `,
  };
  const response = await sgMail.send(msg);
  console.log("email send", response);
};
module.exports = {
  registration,
  login,
  send,
};
