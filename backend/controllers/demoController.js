const asyncHandler = require('express-async-handler');
//Importing Demo Model
const Demo = require('../models/demoModel');
// DEMO CONTROLLERS -- **REPLACE WITH REAL CONTROLLERS**

//@desc Get All Demos
//@route GET /api/demos
//@access Private
const getDemos = asyncHandler(async (req, res) => {
  const demos = await Demo.find();
  res.status(200).json(demos);
});

//@desc Get Only Demos Added By User
//@route GET /api/demosbyuser
//@access Private
const getDemosByUser = asyncHandler(async (req, res) => {
  const demos = await Demo.find({ user: req.user.id });
  res.status(200).json(demos);
});

//@desc Post Demo
//@route POST /api/demos
//@access Private
const postDemo = asyncHandler(async (req, res) => {
  // Just to show how to throw Error
  if (!req.body.text) {
    res.status(400);
    throw new Error('Fill in text field');
  }

  const demo = await Demo.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(demo);
});

//@desc Put Demo
//@route PUT /api/demos/:id
//@access Private
const putDemo = asyncHandler(async (req, res) => {
  const demo = await Demo.findById(req.params.id);
  if (!demo) {
    res.status(400);
    throw new Error('Demo not found therefore can not update');
  }

  const updatedDemo = await Demo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedDemo);
});

//@desc Delete Demo
//@route DELETE /api/demos/:id
//@access Private
const deleteDemo = asyncHandler(async (req, res) => {
  const demo = await Demo.findById(req.params.id);
  if (!demo) {
    res.status(400);
    throw new Error('Demo not found therefore can not delete');
  }

  await demo.remove();
  res.status(200).json({ STATUS: 'DELETED', id: req.params.id });
});

module.exports = {
  getDemos,
  postDemo,
  putDemo,
  deleteDemo,
  getDemosByUser,
};
