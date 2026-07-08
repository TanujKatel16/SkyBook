import {asyncHandler} from "../utils/asyncHandler.js";
import  userService  from "../services/user.service.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {

    const createdUser = await userService.register(
        req.body,
        req.files?.avatar?.[0]
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User registered successfully"
        )
    );



});

export {registerUser};

