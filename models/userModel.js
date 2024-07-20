const { db } = require("../config/database");

const users = db.collection("users");

const createUser = async (firstName, lastName, email, hashedPassword) => {
  const newUser = {
    _id: new Date().getTime().toString(),
    firstName,
    lastName,
    email,
    password: hashedPassword,
  };
  await users.insertOne(newUser);
  return newUser;
};

const findUserByEmail = async (email) => {
  return await users.findOne({ email });
};

const findUserById = async (id) => {
  return await users.findOne({ _id: id });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
