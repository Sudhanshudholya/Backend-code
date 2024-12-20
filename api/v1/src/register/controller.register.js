const registerService = require("./service.register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const registerController = {};

registerController.add = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    if (!name || !email || !mobile || !password || !confirmPassword) {
      return res.send({
        status: false,
        message: "All fields are required",
        data: null,
      });
    }
    if (password !== confirmPassword) {
      return res.send({
        status: false,
        message: "Password and Confirm Password do not match",
        data: null,
      });
    }

    const registeredEmail = await registerService.findEmail(email);
    if (registeredEmail) {
      return res.send({
        status: false,
        message: "Email already exists",
        data: null,
      });
    }

    const registeredMobile = await registerService.findMobile(mobile);

    if (registeredMobile) {
      return res.send({
        status: false,
        message: "Mobile already exists",
        data: null,
      });
    }

    const register = await registerService.add(name, email, mobile, password);
    if (!register) {
      return res.send({
        status: false,
        message: "failed to register",
        data: null,
      });
    }
    return res.send({
      status: true,
      message: "user register successfully",
      data: register,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "something went wrong to add register",
      error,
    });
  }
};

registerController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        status: false,
        message: "All field are required",
        data: null,
      });
    }
    const registeredEmail = await registerService.findEmail(email);
    if (!registeredEmail) {
      return res.send({
        status: false,
        message: "Email not found",
        data: null,
      });
    }
    const matchUserPassword = bcrypt.compareSync(
      password,
      registeredEmail.password
    );
    if (!matchUserPassword) {
      return res.send({
        status: false,
        message: "Password not match",
        data: null,
      });
    }
    const token = jwt.sign(
      { _id: registeredEmail._id },
      process.env.SECRET_TOKEN
    );

    return res.send({
      status: true,
      message: "User Login Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "something went wrong to login",
      error,
    });
  }
};

registerController.findSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await registerService.findSingleUser(id);
      if (!user) {
        return res.send({
          status: false,
          message: "user not found",
          data: null,
        });
      }
      return res.send({ status: true, message: "user found", data: user });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "something went wrong to find single user",
      error,
    });
  }
};

registerController.findAllUsers = async (req, res) => {
  try {
    const users = await registerService.findAllUsers();
    if (users) {
      return res.send({
        status: true,
        message: "all users found",
        data: users,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "something went wrong to find all users",
      error,
    });
  }
};

registerController.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile } = req.body;
    if (id && name && email && mobile) {
      const userUpdate = await registerService.updateUser(id, 
        name,
        email,
        mobile,
      );
      if (userUpdate) {
        return res.send({
          status: true,
          message: "user updated successfully",
          data: userUpdate,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "something went wrong to update user",
      error,
    });
  }
};

registerController.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const deleteUser = await registerService.deleteUser(id);
      if (deleteUser) {
        return res.send({
          status: true,
          message: "user deleted successfully",
          data: deleteUser,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "something went wrong to delete user",
      error,
    });
  }
};

module.exports = registerController;
