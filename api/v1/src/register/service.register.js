const registerModel = require("./model.register");
const registerService = {};
const bcrypt = require("bcrypt");

registerService.create = async (name, email, mobile, password) => {
  const hash = bcrypt.hashSync(password, 10);
  const register = await registerModel.create({name, email, mobile, password: hash});
  return register;
};

registerService.findEmail = async (email) => {
  const registeredEmail = await registerModel.findOne({ email });
  return registeredEmail;
};

registerService.findMobile = async (mobile) => {
  const registeredMobile = await registerModel.findOne({ mobile });
  return registeredMobile;
};

registerService.findSingleUser = async (id) => {
  const singleUser = await registerModel.findById(id);
  return singleUser;
};

registerService.findAllUsers = async () => {
  const allUsers = await registerModel.find({ isDeleted: false });
  return allUsers;
};

registerService.updateUser = async (id, name, email, mobile) => {
  const updateUser = await registerModel.findByIdAndUpdate(id, { name, email, mobile }, { new: true });
  return updateUser;
};

registerService.deleteUser = async (id) => {
  const deleteUser = await registerModel.findByIdAndUpdate(id, { isDeleted: true },  { new: true });
  return deleteUser;
};

module.exports = registerService;
