const jwt = require('jsonwebtoken');

const db = require('../models/index.js');
const { promisify } = require('util');

exports.protect = (async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      console.log("token")
      return next('You are not logged in! Please log in to get access.', 401
      );
    }
  
    // 2) Verification token
    
    const decoded = await promisify(jwt.verify)(token, "thisistokensecretdonotshare")
    let user = await db.User.findById(decoded._id)
    req.user = user;
    next()
})