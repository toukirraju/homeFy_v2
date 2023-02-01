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
} = require("../controllers/OwnerController");

////********* Get personal info ************\\\\
router.get("/", [authVerify.verifyToken], PersonalProfile);

//********* Update owner Personal Profile ************//
router.put(
  "/personal/update",
  [authVerify.verifyToken],
  UpdateOwnerPersonalProfile
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
router.put(
  "/house/update/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  UpdateHouseInfo
);

////********* Delete House ************\\\\
router.delete(
  "/house/delete/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  DeleteHouse
);

////********* Make Default House ************\\\\
router.put(
  "/house/default/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  DefaultHouse
);

////********* Assign manager role ************\\\\
router.put(
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
router.put(
  "/remove/manager/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  RemoveRole
);

module.exports = router;
