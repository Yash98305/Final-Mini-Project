const express = require('express')
const router = express.Router()
const formidable = require("express-formidable");
const pages = require('../controllers/userController.js')
const upload = require("../utils/upload.js")
const {isAuthenticatedUser} = require("../middlewares/authMiddlewaresUser.js")

router.route('/login').post(pages.userLoginController)
router.route('/register').post(pages.userRegisterController)
router.route('/updateprofile/:id').put(formidable(),pages.updateProfile)
router.route('/getallusers').post(pages.getAllUserController)
router.route('/photo/:pid').get(pages.getAllUsersPhotoController)
router.route('/myprofile').get(isAuthenticatedUser,pages.getUserDetailsController)
router.route('/conversation/add').post(pages.newConvertionController)
router.route('/conversation/get').post(pages.getConversationController)
router.route('/message/add').post(pages.newMessageController)
router.route('/message/get/:id').get(pages.getMessagesController)

module.exports = router