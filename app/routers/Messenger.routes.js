const router = require("express").Router();
const {
  getConversations,
  addConversation,
  editConversation,
  addMessage,
  getMessages,
  getUserForConversation,
} = require("../controllers/MessengerController");
const { authVerify } = require("../middlewares/authVerify");

router.get("/conversations", [authVerify.verifyToken], getConversations);

router.post("/conversations", [authVerify.verifyToken], addConversation);

router.patch("/conversations/:id", [authVerify.verifyToken], editConversation);

////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////////////////////////////// Message \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

router.post("/messages", [authVerify.verifyToken], addMessage);

router.get("/messages", [authVerify.verifyToken], getMessages);

router.get("/users", [authVerify.verifyToken], getUserForConversation);

module.exports = router;
