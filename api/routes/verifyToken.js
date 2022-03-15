const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  const token = authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err){
        return res.status(403).json(token)};
      req.user = user;
      next();
    })
  }
  else {
    return res.status(401).json("U are not authenticated!")
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("U are not allowed that!")
    }
  });
};

const verifyTokenAndOwn = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json("This is not your post")
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("U are not allowed that!")
    }
  });
};


module.exports = { verifyToken, verifyTokenAndOwn, verifyTokenAndAuthorization, verifyTokenAndAdmin };