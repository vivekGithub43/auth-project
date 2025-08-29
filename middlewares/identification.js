// const jwt = require('jsonwebtoken');

// exports.identifier = (req, res, next) => {
//   let token;

//   if (req.headers.client === 'not-browser') {
//     // API client
//     token = req.headers.authorization;
//   } else {
//     // Browser
//     token = req.cookies['Authorization'];
//   }

//   if (!token) {
//     return res.status(403).json({ success: false, message: 'Unauthorized: Token missing' });
//   }

//   try {
//     const userToken = token.split(' ')[1]; // remove "Bearer"
//     const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);

//     req.user = jwtVerified;
//     next();
//   } catch (error) {
//     return res.status(403).json({ success: false, message: 'Unauthorized: Invalid token' });
//   }
// };
const jwt = require('jsonwebtoken');

exports.identifier = (req, res, next) => {
  // Read token directly from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ success: false, message: 'Unauthorized: Token missing' });
  }

  try {
    // authHeader = "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) throw new Error('Token missing after Bearer');

    const jwtVerified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = jwtVerified; // add user info to request
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};
