const User = require("../users/users-model");
const Post = require("../posts/posts-model");

function logger(req, res, next) {}

function validateUserId(req, res, next) {
  const { id } = req.params;
  User.getById(id)
    .then((r) => {
      if (r) {
        req.user = r;
        next();
      } else {
        res.status(404).json({ mesaj: "kullanıcı bulunamadı" });
      }
    })
    .catch((err) => {});
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ mesaj: "gerekli name alanı eksik" });
  }
  User.insert({ name })
    .then((r) => {
      req.user = r;
      next();
    })
    .catch((err) => res.status(404).json({ mesaj: "kullanıcı bulunamadı" }));
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ mesaj: "gerekli text alanı eksik" });
  }
  Post.insert({ text: "sa", user_id: req.user.id })
    .then((r) => {
      req.post = r;
      return next();
    })
    .catch((err) => {
      console.log(err);
    });
}
function validateName(req, res, next) {
  const { name } = req.body;
  if (name) {
    console.log('first')
    next();
  } else {
    res.status(400).json({ message: "NAME BULUNAMADI" });
  }
}

module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
  validateName,
};
