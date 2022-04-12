const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Importing Admin Model
const Admin = require('../models/adminModel');

//@desc To Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//@desc Register Admin/Recorder
//@route POST /api/admin/register
//@access Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, phone, email, password, confirmPassword, admin_level } =
    req.body;

  // Check for missing fields: name, email, password
  if (!name || !phone || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }

  // Check for existing admin
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error('An admin/recorder with this email already exists');
  }

  //Check for password match
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error('Passwords do not match');
  }

  //Hash admin password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create admin
  const admin = await Admin.create({
    name,
    email,
    phone,
    admin_level,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      shorter_id: admin.shorter_id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      admin_level: admin.admin_level,
      status: admin.status,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Admin could not be created');
  }
});

//@desc Login Admin/Register
//@route POST /api/admin/login
//@access Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields: email, password
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  // Check for existing admin
  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(400);
    throw new Error('An admin/recorder with this email does not exist');
  }

  //Check for password match
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Incorrect password');
  }

  //If admin is found and password is correct
  res.status(201).json({
    shorter_id: admin.shorter_id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    admin_level: admin.admin_level,
    status: admin.status,
    token: generateToken(admin._id),
  });
});

//@desc Get Admin/Recorder Data
//@route GET /api/admin/get-admin-data
//@access Private
const getAdminData = asyncHandler(async (req, res) => {
  res.status(200).json(req.admin);
});

//@desc Update Logged In Admin/Recorder Data
//@route PUT /api/admin/update-logged-in-admin-data
//@access Private
const updateAdminData = asyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;
  // Check for missing required fields: name, email, password
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }
  // Check for existing admin with new email
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    //Check if admin is the same as the logged in admin
    if (adminExists._id.toString() !== req.admin._id.toString()) {
      res.status(400);
      throw new Error('An admin/recorder with this email already exists');
    }
  }

  //Update Admin
  const updatedAdmin = await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      ...req.body,
    },
    { new: true }
  );
  if (updatedAdmin) {
    res.status(201).json({
      shorter_id: updatedAdmin.shorter_id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      phone: updatedAdmin.phone,
      admin_level: updatedAdmin.admin_level,
      status: updatedAdmin.status,
      token: generateToken(updatedAdmin._id),
    });
  } else {
    res.status(400);
    throw new Error('Update failed, Please try again later.');
  }
});

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminData,
  updateAdminData,
};
