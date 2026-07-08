import {Router} from "express";
import {loginUser, registerUser} from "../controllers/user.controller.js";

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

export default router;