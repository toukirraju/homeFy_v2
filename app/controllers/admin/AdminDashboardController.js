const { serverError, resourceError } = require("../../utils/error");

const OwnerInfo = require("../../database/models/ownerModel");
const HouseInfo = require("../../database/models/houseInfoModel");
const ApartmentInfo = require("../../database/models/apartmentModel");
const RenterInfo = require("../../database/models/renterModel");
const PostInfo = require("../../database/models/postModel");

const getDashboardWidgets = async (req, res) => {
  try {
    // Count  all documents
    const ownersCount = await OwnerInfo.countDocuments();
    const houseCount = await HouseInfo.countDocuments();
    const apartmentCount = await ApartmentInfo.countDocuments();
    const renterCount = await RenterInfo.countDocuments();

    const postCount = await PostInfo.countDocuments();
    const premiumOwner = await OwnerInfo.countDocuments({ isHomifyPlus: true });
    const blockedOwnerCount = await OwnerInfo.countDocuments({
      isBlocked: true,
    });
    const blockedRenterCount = await RenterInfo.countDocuments({
      isBlocked: true,
    });

    res.status(200).json({
      ownersCount,
      houseCount,
      apartmentCount,
      renterCount,
      postCount,
      premiumOwner,
      blockedOwnerCount,
      blockedRenterCount,
    });
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  getDashboardWidgets,
};
