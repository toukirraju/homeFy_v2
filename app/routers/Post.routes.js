const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");

const { authVerify } = require("../middlewares/authVerify");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getTimelinePosts,
  getSpecificHousePosts,
  getPostWidget,
} = require("../controllers/PostController");

//create post Route
router.post(
  "/create",
  [authVerify.verifyToken, authVerify.isOwner],
  createPost
);

router.get(
  "/specificposts",
  [authVerify.verifyToken, authVerify.isOwner],
  getSpecificHousePosts
);

router.get("/postwidget", [authVerify.verifyToken], getPostWidget);

router.delete("/:id", [authVerify.verifyToken, authVerify.isOwner], deletePost);

router.get("/timeline/posts", getTimelinePosts);

router.put("/:id", updatePost);

module.exports = router;
