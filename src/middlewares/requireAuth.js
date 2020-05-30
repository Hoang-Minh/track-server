const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization = Bearer sfksnflsafs

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "MY_SECRET", async (error, payload) => {
    if (error) {
      return res.status(401).send({ error: "You must be logged in" });
    }

    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user; // so now, req.user in all request will be equal to user !!!!!!
    return next();
  });
};
