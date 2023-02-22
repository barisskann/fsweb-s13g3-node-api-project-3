const express = require("express");
const User = require("./users-model");
const Post = require("../posts/posts-model");
const {
  logger,
  validatePost,
  validateUser,
  validateUserId,
  validateName,
} = require("../middleware/middleware");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get("/", (req, res) => {
  User.get()
    .then((r) => res.status(200).json(r))
    .catch((err) => console.log(err));
});

router.get("/:id", validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  res.status(200).json(req.user);
});

router.post("/", validateUser, (req, res) => {
  res.status(200).json(req.user);
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
});

router.put("/:id", validateUserId, validateName, (req, res) => {
  const { name } = req.body;
  const { id } = req.user;
  User.update(id, { name })
    .then((r) => res.status(200).json(r))
    .catch((err) => console.log(err));
});

router.delete("/:id", validateUserId, (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  User.remove(req.user.id).then((r) => res.status(200).json(req.user));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Post.getById(req.user.id).then((r) => res.json(r));
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  res.status(200).json(req.post);
});

module.exports = router;
