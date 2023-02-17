const ApartmentModel = require("../database/models/apartmentModel");
const HouseModel = require("../database/models/houseInfoModel");
const PostModel = require("../database/models/postModel");
const { serverError, resourceError } = require("../utils/error");

///////////////////////////// post created  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const createPost = async (req, res) => {
  const { ownerId, defaultHomeID } = req.body;
  // console.log(req.body);
  try {
    const post = await PostModel.findById({ _id: req.body._id });

    const newPost = new PostModel({
      _id: req.body._id,
      ownerId: ownerId,
      defaultHomeID,
      owner: ownerId,
      house: defaultHomeID,
      apartment: req.body._id,
      description: req.body.description,
      isVisible: req.body.isVisible,
    });
    if (req.body.isAvailable || req.body.apartment.isAvailable) {
      if (post) {
        await post.updateOne({ $set: req.body });
        res.status(200).json({ message: "post  updated " });
      } else {
        await newPost.save();
        res.status(200).json({ message: "post created" });
      }
    } else {
      return resourceError(res, "Apartment is not available for post");
    }
  } catch (error) {
    serverError(res, error);
  }
};

//////////////////////////// get specific house posts  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const getSpecificHousePosts = async (req, res) => {
  const { _id, defaultHomeID } = req.user;

  // const ownerId = "63c77d47acfe53798bd6ce6c";
  // const defaultHomeID = "63c8ef94a26e9c7dd7b0d871";
  // .sort({ "apartmentDetails.floor": 1 })
  try {
    const Posts = await PostModel.find({
      ownerId: _id.toString(),
      defaultHomeID,
    })

      .populate([
        {
          path: "owner",
          model: "OwnerInfoModel",
          select: "-password",
        },
        {
          path: "house",
          model: "HouseInfo",
        },
        {
          path: "apartment",
          model: "ApartmentModel",
        },
      ])
      .sort({ "apartmentDetails.floor": 1 });

    res.status(200).json(Posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

/////////////////////////// get post widget data \\\\\\\\\\\\\\\\\\\\\\\\\\\\
const getPostWidget = async (req, res) => {
  const { _id, defaultHomeID, role } = req.user;

  // const ownerId = "63c77d47acfe53798bd6ce6c";
  // const defaultHomeID = "63c8ef94a26e9c7dd7b0d871";
  // .sort({ "apartmentDetails.floor": 1 })
  try {
    const house = await HouseModel.findOne({
      _id: defaultHomeID,
      ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
    });
    const postInfo = await PostModel.aggregate([
      {
        $match: {
          ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
          defaultHomeID,
        },
      },
      {
        $group: {
          _id: null,
          totalPost: { $sum: 1 },
          activePost: {
            $sum: {
              $cond: [{ $eq: ["$isVisible", true] }, 1, 0],
            },
          },
          inactivePost: {
            $sum: {
              $cond: [{ $eq: ["$isVisible", false] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalPost: 1,
          activePost: 1,
          inactivePost: 1,
        },
      },
    ]);

    res.status(200).json({ ...postInfo[0], ...house._doc });
  } catch (error) {
    res.status(500).json(error);
  }
};

///////////////////////////  delete post  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const deletePost = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.user;

  try {
    const post = await PostModel.findById(id);
    if (post.ownerId === _id.toString()) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
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

//get timeline posts

const getTimelinePosts = async (req, res) => {
  try {
    const { lastPostId, limit } = req.query;

    let query = { isVisible: true, isBlock: false };
    if (lastPostId) {
      query._id = { $lt: lastPostId };
    }
    const [recentlyUpdatedAt, recentlyCreatedAt] = ["updatedAt", "createdAt"];
    const posts = await PostModel.find(query)
      .sort([
        [recentlyUpdatedAt, -1],
        [recentlyCreatedAt, -1],
      ])
      .limit(parseInt(limit))
      .populate("owner")
      .populate("house")
      .populate("apartment");

    const hasMore = posts.length === parseInt(limit);

    const response = {
      posts,
      hasMore,
      lastPostId: hasMore ? posts[posts.length - 1]._id : null,
    };

    res.json(response);
    // const { lastPostId } = req.query;

    // const limit = 4; // Set your desired limit here

    // let query = {};
    // if (lastPostId) {
    //   query._id = { $lt: lastPostId };
    // }
    // console.log(req.params);
    // const posts = await PostModel.find({ ...query, ...filter })
    //   .sort({ createdAt: -1 })
    //   .limit(req.params.limit)
    //   .populate("owner", "firstName lastName")
    //   .populate("house", "name")
    //   .populate("apartment", "name");
    // res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//   try {
//     const currentUserPosts = await PostModel.find({ ownerId: ownerId });

//     const allPosts = await PostModel.find({});

//     res.status(200).json(
//       allPosts.sort((a, b) => {
//         return b.updatedAt - a.updatedAt;
//       })
//     );
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

module.exports = {
  createPost,
  getSpecificHousePosts,
  getPostWidget,
  updatePost,
  deletePost,
  getTimelinePosts,
};
