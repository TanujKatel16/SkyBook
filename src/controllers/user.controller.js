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

const loginUser = asyncHandler(async(req,res)=>{

    const {
        user,
        accessToken,
        refreshToken
    } = await userService.login(req.body);

    const options = {
        httpOnly: true,
        secure: false
    };

    console.log(accessToken);
    console.log(refreshToken);

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            user,
            "User logged in successfully"
        )
    );


})


export {
    registerUser,
    loginUser
};

