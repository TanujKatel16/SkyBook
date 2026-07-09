import {Router} from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
    updateAccessToken
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
router.get("/logout",verifyJWT,logoutUser);
router.post("/refresh-token",updateAccessToken);

export default router;