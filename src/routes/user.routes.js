import {Router} from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
    updateAccessToken,
    getCurrentUser

} from "../controllers/user.controller.js";

import verifyJWT from "../middleware/verifyJWT.js";

const router = Router();

import { upload } from "../middleware/multer.middleware.js";

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
)
router.post("/login",loginUser);
router.post("/refresh-token",updateAccessToken);
router.post("/register",registerUser);

router.post("/logout",verifyJWT,logoutUser);
router.get("/current-user",verifyJWT,getCurrentUser);


export default router;