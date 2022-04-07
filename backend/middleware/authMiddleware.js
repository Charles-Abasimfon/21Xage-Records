const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user still exists
      const currentUser = await User.findById(decoded.id).select('-password');
      //If user does not exist, return error
      if (!currentUser) {
        return next(new ErrorResponse(`User no longer exists`, 404));
      } else {
        //If user exists, set user to req.user and call next middleware
        req.user = currentUser;
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized to access this route');
    }
  }

  //If token is not found, return error
  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this route, No Token');
  }
});

module.exports = {
  protect,
};
