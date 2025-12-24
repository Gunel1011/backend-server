const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  sendOTP,
  changeProfileImage,
  getUserProfileData,
  updateProfileData,
  confirmUserDeactivation,
  reactivateUser,
  confirmUserReactivation,
  changeUserRole,
  deactivateUser,
  getAllUserList,
  changePassword,
  sendResetPasswordOTP,
  deleteUserAccount,
  sendDeleteAccountOTP,
  sendAdminDeleteOTP,
  adminChangeStatus,
  adminDeleteUser,
  adminDeactivateUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOTP);
router.post("/change-profile-image", changeProfileImage);
router.get("/user-profile", getUserProfileData);
router.put("/update-profile", updateProfileData);
router.post("/confirm-deactivation", confirmUserDeactivation);
router.post("/reactivate-user", reactivateUser);
router.post("/confirm-reactivation", confirmUserReactivation);
router.put("/change-role", changeUserRole);
router.post("/deactivate-user", deactivateUser);
router.get("/users", getAllUserList);
router.put("/change-password", changePassword);
router.post("/send-reset-password-otp", sendResetPasswordOTP);
router.delete("/delete-account", deleteUserAccount);
router.post("/send-delete-account-otp", sendDeleteAccountOTP);
router.post("/admin/send-delete-otp", sendAdminDeleteOTP);
router.put("/admin/change-status", adminChangeStatus);
router.delete("/admin/delete-user", adminDeleteUser);
router.put("/admin/deactivate-user", adminDeactivateUser);

module.exports = router;
