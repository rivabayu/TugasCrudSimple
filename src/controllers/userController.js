// exports.getUser = (req, res, next) => {
// 	res.send({
// 		nama: 'YOTO',
// 		Alamat: 'Yogyakarta',
// 		Pekerjaan: 'Presiden',
// 		Umur: 44
// 	})
// }

const { User } = require("../models");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res, next) => {
	try {
		const payload = req.body

		if (payload.name == "" && payload.email == "") {
			return res.status(400).send({
				message: `body is required, cannot be empty`
			})
		}
		return res.status(201).send({
			message: `success data created`
		})
	} catch (error) {
		return res.status(500).send(error)
	}
}

exports.getUsers = async (req, res) => {
	try {
	  const users = await User.findAll();
  
	  return res.status(200).send({
		message: "success",
		data: users,
	  });
	} catch (error) {
	  return res.status(500).send({ error });
	}
  };


exports.getUserById = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  const user = await User.findByPk(id);
  
	  if (!user) {
		return res.status(404).send({
		  message: "user not found",
		});
	  }  
	  return res.status(200).send({
		message: "success",
		data: user,
	  });
	} catch (error) {
	  return res.status(500).send(error);
	}
};

exports.updateUser = async (req, res) => {
	try {
	  const { id } = req.params;
	  const { firstName, lastName, password, email, username, roles } = req.body;
  
	  const hashedPassword = bcrypt.hashSync(password, 8);
  
	  const user = await User.findByPk(id);
	  if (!user) {
		return res.status(404).send({ message: "User does not exist" });
	  }
	    
	  await user.update({
		firstName: firstName,
		lastName: lastName,
		username: username,
		email: email,
		password: hashedPassword,
		roles: roles,
	  });
  
	  return res.status(200).send({ message: "updated successfully" });
	} catch (error) {
	  return res.status(500).send(error);
	}
  };

exports.deleteUser = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  const user = await User.findByPk(id);
  
	  if (!user) {
		return res.status(404).send({ message: "User does not exist" });
	  }
  
	  await user.destroy();
  
	  return res.status(200).send({ message: "User deleted successfully" });
	} catch (error) {
	  return res.status(500).send(error);
	}
  };
  