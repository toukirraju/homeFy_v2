const router = require("express").Router();
const { authVerify } = require("../middlewares/authVerify");

const {
  PersonalProfile,
  UpdateOwnerPersonalProfile,
  CreateHouse,
  GetAllHouses,
  UpdateHouseInfo,
  UpdateHouseDocuments,
  DeleteHouse,
  DefaultHouse,
  SearchManager,
  AssignRole,
  GetAllAssignedManager,
  RemoveRole,
  UpdateProfileImage,
  RemoveProfileImage,
  uploadHouseImage,
  removeHouseImage,
} = require("../controllers/OwnerController");

////********* Get personal info ************\\\\
router.get("/", [authVerify.verifyToken], PersonalProfile);

//********* Update owner Personal Profile ************//
router.patch(
  "/personal/update",
  [authVerify.verifyToken],
  UpdateOwnerPersonalProfile
);

//********* Update Personal Profile Image ************//
router.patch(
  "/personal/update/image",
  [authVerify.verifyToken],
  UpdateProfileImage
);

//********* remove Personal Profile Image ************//
router.patch(
  "/personal/remove/image",
  [authVerify.verifyToken],
  RemoveProfileImage
);

////********* Create new home ************\\\\
router.post(
  "/house/create",
  [authVerify.verifyToken, authVerify.isOwner],
  CreateHouse
);

////********* Get All Houses ************\\\\
router.get(
  "/house/all",
  [authVerify.verifyToken, authVerify.isOwner],
  GetAllHouses
);

////********* Update House info ************\\\\
router.patch(
  "/house/update/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  UpdateHouseInfo
);

////********* upload House image ************\\\\
router.patch(
  "/house/image/upload/:houseId",
  [authVerify.verifyToken, authVerify.isOwner],
  uploadHouseImage
);
////********* upload House image ************\\\\
router.patch(
  "/house/image/remove/:houseId",
  [authVerify.verifyToken, authVerify.isOwner],
  removeHouseImage
);
////********* Delete House ************\\\\
router.delete(
  "/house/delete/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  DeleteHouse
);

////********* Make Default House ************\\\\
router.patch(
  "/house/default/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  DefaultHouse
);

////********* Assign manager role ************\\\\
router.patch(
  "/assign/manager/:srcId",
  [authVerify.verifyToken, authVerify.isOwner],
  AssignRole
);

////********* Get Assigned manager ************\\\\
router.get(
  "/manager/all",
  [authVerify.verifyToken, authVerify.isOwner],
  GetAllAssignedManager
);

////********* Search Manager ************\\\\
router.get(
  "/manager/:username",
  [authVerify.verifyToken, authVerify.isOwner],
  SearchManager
);

////********* Remove manager role ************\\\\
router.patch(
  "/remove/manager/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  RemoveRole
);

module.exports = router;
