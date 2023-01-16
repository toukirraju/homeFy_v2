const ApartmentModel = require("../database/models/apartmentModel");
const HouseInfo = require("../database/models/houseInfoModel");
const PostModel = require("../database/models/postModel");
const { serverError, resourceError } = require("../utils/error");

const createPost = async (req, res) => {
  const { ownerId, apartmentId } = req.body;

  try {
    // const houseInfo = await HouseInfo.findById(ownerId);
    const post = await PostModel.findById({ _id: apartmentId });

    const apartmentInfo = await ApartmentModel.findOne(
      { ownerId: ownerId },
      { allApartments: { $elemMatch: { _id: apartmentId } } }
    );

    const apartment = apartmentInfo.allApartments[0];
    //  res.status(200).json(!apartment.isAvailable);

    const newPost = new PostModel({
      _id: apartmentId,
      ownerId: ownerId,
      desc: req.body.desc,
      isVisible: req.body.isVisible,
      //   ratings: {
      //     userId: req.body.userId,
      //     rating: req.body.rating,
      //   },
      //   comments: {
      //     userId: req.body.userId,
      //     comment: req.body.comment,
      //     isVisible: true,
      //   },
    });
    if (apartment.isAvailable) {
      if (post) {
        await post.updateOne({ $set: req.body });
        res.status(200).json({ message: "post is updated successfully" });
      } else {
        try {
          await newPost.save();
          res.status(200).json(newPost);
        } catch (error) {
          serverError(res, error);
        }
      }
    } else {
      return resourceError(res, "Apartment not available");
    }
  } catch (error) {
    serverError(res, error);
  }
};

//get user post
const getUserPost = async (req, res) => {
  const { _id } = req.user;

  try {
    const userPosts = await PostModel.find({ ownerId: _id });

    let posts = [];

    for (let i = 0; i < userPosts.length; i++) {
      try {
        const apartments = await ApartmentModel.findOne(
          { ownerId: _id },
          { allApartments: { $elemMatch: { _id: userPosts[i]._id } } }
        );

        const apartment = apartments.allApartments[0];
        posts.push({ ...userPosts[i]._doc, ...apartment._doc });
      } catch (error) {
        res.status(500).json(error);
      }
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get post
const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { ownerId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.ownerId === ownerId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete post
const deletePost = async (req, res) => {
  const id = req.params.id;
  const { ownerId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.ownerId === ownerId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get timeline posts

const getTimelinePosts = async (req, res) => {
  const ownerId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ ownerId: ownerId });

    const allPosts = await PostModel.find({});
    //   res.status(200).json(
    //     currentUserPosts
    //       .concat(...followingPosts[0].followingPosts)
    //       .sort((a, b) => {
    //         return b.updatedAt - a.updatedAt;
    //       })
    //   );

    res.status(200).json(
      allPosts.sort((a, b) => {
        return b.updatedAt - a.updatedAt;
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  getUserPost,
  getPost,
  updatePost,
  deletePost,
  getTimelinePosts,
};
