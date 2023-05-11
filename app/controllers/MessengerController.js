const Conversations = require("../database/models/conversations");
const Messages = require("../database/models/messages");
const OwnerInfoModel = require("../database/models/ownerModel");
const RenterInfoModel = require("../database/models/renterModel");
const AdminModel = require("../database/models/adminModel");
const { serverError, resourceError } = require("../utils/error");

//////////////////////////// get all Conversations  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const getConversations = async (req, res) => {
  const query = {};

  if (req.query.participants_like) {
    const participants = String(req.query.participants_like).split(",");
    if (participants.length === 1) {
      const regexParticipants = participants.map(
        (p) => new RegExp("\\b" + p + "\\b", "i")
      ); // Create regex patterns for each participant
      query.participants = { $in: regexParticipants }; // Use $in and the regex patterns to search for documents where participants include the given strings
    } else {
      query.participants = { $in: participants };
    }
  }

  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const skip = (page - 1) * limit;
  const sort = { createdAt: -1 };

  try {
    const conversations = await Conversations.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const totalCount = await Conversations.countDocuments(query);
    res.status(200).json({ conversations, totalCount });
  } catch (error) {
    res.status(500).json(error);
  }
};

//////////////////////////// add Conversation  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const addConversation = async (req, res) => {
  // const io = req.io;

  const myUsername = req.user.username;
  const participantUsername = req.body.participant.username;

  const loggedInUser = {
    username: req.user.username,
    fullname: req.user.fullname,
    _id: req.user._id,
  };

  const newConversation = new Conversations({
    participants: `${myUsername}-${participantUsername}`,
    users: [loggedInUser, req.body.participant],
    message: req.body.message,
  });

  try {
    const existingParticipantString = [
      `${myUsername}-${participantUsername}`,
      `${participantUsername}-${myUsername}`,
    ];

    //check conversation  existence
    const ConversationExist = await Conversations.find({
      participants: { $in: existingParticipantString },
    });

    if (ConversationExist.length > 0) {
      //update conversation
      const filter = { _id: ConversationExist[0].id };
      const update = {
        $set: { message: req.body.message },
      };
      const options = { returnDocument: "after" };

      const updatedConversation = await Conversations.findByIdAndUpdate(
        filter,
        update,
        options
      );
      updatedConversation && res.status(200).json(updatedConversation);

      //emit socket event to all connected clients
      global.io.emit("conversation", {
        data: updatedConversation,
      });
    } else {
      //create new conversation
      const conversation = await newConversation.save();
      res.status(200).json(conversation);

      //emit socket event to all connected clients
      global.io.emit("conversation", {
        data: conversation,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//////////////////////////// Edit Conversation  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const editConversation = async (req, res) => {
  // const io = req.io;
  const id = req.params.id;
  try {
    const filter = { _id: id };
    const update = {
      $set: req.body,
    };
    const options = { returnDocument: "after" };

    const result = await Conversations.findByIdAndUpdate(
      filter,
      update,
      options
    );
    result && res.status(200).json(result);
    //emit socket event to all connected clients
    global.io.emit("conversation", {
      data: result,
    });
  } catch (error) {
    serverError(res, error);
  }
};

////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////////////////////////////// Message \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//////////////////////////// add message  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const addMessage = async (req, res) => {
  // const io = req.io;
  const newMessage = new Messages({
    conversationId: req.body.conversationId,
    sender: req.body.sender,
    receiver: req.body.receiver,
    message: req.body.message,
  });

  try {
    const message = await newMessage.save();
    res.status(200).json(message);

    //emit socket event to all connected clients
    global.io.emit("message", {
      data: message,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//////////////////////////// get specific conversetion messages  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const getMessages = async (req, res) => {
  const query = {};

  if (req.query.conversationId) {
    query.conversationId = req.query.conversationId;
  }

  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const skip = (page - 1) * limit;
  const sort = { createdAt: -1 };

  try {
    const messages = await Messages.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const totalCount = await Messages.countDocuments(query);
    res.status(200).json({ messages, totalCount });
  } catch (error) {
    res.status(500).json(error);
  }
};

//////////////////////////// get user for conversetion   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const getUserForConversation = async (req, res) => {
  const myUsername = req.user.username;
  const query = {};

  if (req.query.username) {
    query.username = req.query.username;
  }

  try {
    if (myUsername === req.query.username) {
      return resourceError(res, "You can not send messege your self!");
    }

    const [isOwnerUsernameExist, isRenterUsernameExist, isAdminUsernameExist] =
      await Promise.all([
        OwnerInfoModel.findOne(query),
        RenterInfoModel.findOne(query),
        AdminModel.findOne(query),
      ]);

    if (isOwnerUsernameExist) {
      // owner existence
      const { username, fullname, _id } = isOwnerUsernameExist;
      res.status(200).json({ username, fullname, _id });
    } else if (isRenterUsernameExist) {
      // renter existence
      const { username, fullname, _id } = isRenterUsernameExist;
      res.status(200).json({ username, fullname, _id });
    } else if (isAdminUsernameExist) {
      // admin existence
      const { username, fullname, _id } = isAdminUsernameExist;
      res.status(200).json({ username, fullname, _id });
    } else {
      return resourceError(res, "username not found!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getConversations,
  addConversation,
  editConversation,
  addMessage,
  getMessages,
  getUserForConversation,
};
