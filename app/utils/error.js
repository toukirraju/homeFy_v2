module.exports = {
  //All catch Error

  serverError(res, error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error Occurred",
    });
  },

  resourceError(res, message) {
    return res.status(400).json({
      message,
    });
  },
};
