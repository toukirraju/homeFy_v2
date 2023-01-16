const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");

const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getTimelinePosts,
  getUserPost,
} = require("../controllers/PostController");

//create post Route
router.post("/create", createPost);

router.get("/userposts", authenticate, getUserPost);

router.get("/timeline", getTimelinePosts);

router.get("/:id", getPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;
