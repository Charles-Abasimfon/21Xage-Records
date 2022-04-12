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
//@access Private
const registerAdmin = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    email,
    password,
    telegram,
    confirmPassword,
    admin_level,
  } = req.body;

  // Check for missing fields: name, email, password, telegram
  if (!name || !phone || !email || !password || !telegram || !confirmPassword) {
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
  const admin = await Admin.create({ ...req.body, password: hashedPassword });

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

//@desc Get Logged In Admin/Recorder Data
//@route GET /api/admin/get-logged-in-admin-data
//@access Private
const getLoggedInAdminData = asyncHandler(async (req, res) => {
  res.status(200).json(req.admin);
});

//@desc Update Logged In Admin/Recorder Data
//@route PUT /api/admin/update-logged-in-admin-data
//@access Private
const updateLoggedInAdminData = asyncHandler(async (req, res) => {
  const { name, phone, email, telegram } = req.body;
  // Check for missing required fields: name, email, password, telegram
  if (!name || !phone || !email || !telegram) {
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

//@desc Update Logged In Admin/Recorder Password
//@route PUT /api/admin/update-logged-in-admin-password
//@access Private
const updateLoggedInAdminPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  // Check for missing fields: password, confirmPassword
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }
  //Check for password match
  if (newPassword !== confirmNewPassword) {
    res.status(400);
    throw new Error('Passwords do not match');
  }
  //Confirm old password
  const admin = await Admin.findById(req.admin._id);
  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Old password is Incorrect');
  }
  //Confirm new password length
  if (newPassword.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters long');
  }
  //Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  //Update Admin
  const updatedAdmin = await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      password: hashedPassword,
    },
    { new: true }
  );

  if (updatedAdmin) {
    res.status(201).json({ message: 'SUCCESSFULLY CHANGED PASSWORD' });
  } else {
    res.status(400);
    throw new Error('Password change failed, Please try again later.');
  }
});

//@desc Get All Recorders
//@route GET /api/admin/get-recorders
//@access Private
const getAllRecorders = asyncHandler(async (req, res) => {
  const recorders = await Admin.find({ admin_level: 'Recorder' }).select(
    '-password'
  );
  res.status(200).json(recorders);
});

//@desc Get A Recorders Info By Id (id is passed as a parameter)
//@route GET /api/admin/get-recorder-data/?id=:id
//@access Private
const getRecorderDataById = asyncHandler(async (req, res) => {
  const adminId = req.query.id;

  // Check for missing id tag
  if (!adminId) {
    res.status(400);
    throw new Error('Missing id tag');
  }
  // Check for existing admin
  const admin = await Admin.findById(adminId).select('-password');
  if (!admin) {
    res.status(400);
    throw new Error('An admin/recorder with this id does not exist');
  }

  //If admin/recorder is found
  res.status(201).json(admin);
});

//@desc Update A Recorder By Id (id and updateJustStatus are passed as a parameter)
//@route PUT /api/admin/update-recorder-data/?id=:id&updateJustStatus=:updateJustStatus
//@access Private
const updateRecorderDataById = asyncHandler(async (req, res) => {
  const recorderId = req.query.id;
  const updateJustStatus = req.query.updateJustStatus;
  const { name, phone, email, telegram } = req.body;

  // Check for missing id query
  if (!recorderId) {
    res.status(400);
    throw new Error('Missing id query');
  }

  //Check for missing updateJustStatus query
  if (!updateJustStatus) {
    res.status(400);
    throw new Error('Missing updateJustStatus query');
  }

  // If updateJustStatus !== 'true', Do the following:
  if (updateJustStatus !== 'true') {
    // Check for missing required fields: name, email, password, telegram
    if (!name || !phone || !email || !telegram) {
      res.status(400);
      throw new Error('Please enter all required fields');
    }
    // Check for existing recorder with new email
    const recorderExists = await Admin.findOne({ email });
    if (recorderExists) {
      //Check if recorder is the same as the recorder to be updated
      if (recorderExists._id.toString() !== recorderId.toString()) {
        res.status(400);
        throw new Error('An admin/recorder with this email already exists');
      }
    }
  }
  //Update Recorder
  const updatedRecorder = await Admin.findByIdAndUpdate(
    recorderId,
    { ...req.body },
    { new: true }
  ).select('-password');
  if (updatedRecorder) {
    res.status(201).json(updatedRecorder);
  } else {
    res.status(400);
    throw new Error('Recorder could not be updated');
  }
});

//@desc Delete A Recorder By Id (id is passed as a parameter)
//@route DELETE /api/admin/delete-recorder/?id=:id
//@access Private
const deleteRecorderById = asyncHandler(async (req, res) => {
  const recorderId = req.query.id;
  if (!recorderId) {
    res.status(400);
    throw new Error('Missing id query');
  }
  //Check for existing recorder
  const recorder = await Admin.findById(recorderId);
  if (!recorder) {
    res.status(400);
    throw new Error('An admin/recorder with this id does not exist');
  }
  //Delete Recorder
  const deletedRecorder = await Admin.findByIdAndDelete(recorderId);
  if (deletedRecorder) {
    res.status(204).json({ message: 'Recorder Deleted Successfully' });
  } else {
    res.status(400);
    throw new Error('Recorder could not be deleted');
  }
});

module.exports = {
  registerAdmin,
  loginAdmin,
  getLoggedInAdminData,
  updateLoggedInAdminData,
  updateLoggedInAdminPassword,
  getAllRecorders,
  getRecorderDataById,
  updateRecorderDataById,
  deleteRecorderById,
};
