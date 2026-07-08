import { ApiError } from "../utils/ApiError.js";
import userRepository from "../repositories/user.repository.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {User} from "../models/user.model.js"

class userService {

    async register(userData, avatarFile) {

        const {
            username,
            email,
            password,
        } = userData;

        if (
            [username, email, password]
                .some(field => !field || field.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required");
        }

        const existingEmail =
            await userRepository.findByEmail(email);

        if (existingEmail) {
            throw new ApiError(409, "Email already registered");
        }

        const existingUsername =
            await userRepository.findByUsername(username);

        if (existingUsername) {
            throw new ApiError(409, "Username already taken");
        }

        if (!avatarFile) {
            throw new ApiError(400, "Avatar is required");
        }

        const avatar = await uploadOnCloudinary(
            avatarFile.path
        );

        if (!avatar) {
            throw new ApiError(500, "Failed to upload avatar");
        }

        const user =
            await userRepository.createUser({

                username: username.toLowerCase(),
                email,
                password,

                avatar: {
                    url: avatar.url,
                    public_id: avatar.public_id
                }

            });


        const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

        return createdUser;
    }






    
}

export default new userService();