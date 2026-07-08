import { ApiError } from "../utils/ApiError.js";
import userRepository from "../repositories/user.repository.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

class UserService {

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


        const createdUser =await userRepository.findUserWithoutSensitiveFields(user._id);

        return createdUser;
    }


    async generateAccessAndRefreshTokens(user) {

        const accessToken = user.generateAccessToken();

        const refreshToken = user.generateRefreshToken();

        await userRepository.updateRefreshToken(
            user._id,
            refreshToken
        );

        return {
            accessToken,
            refreshToken
        };

    }
    async login(userData){

        const{
            email,
            username,
            password,
        }=userData;

        if((!username && !email)|| !password ){
            throw new ApiError(400,"username/email and password required");
        }
        const loginIdentifier=email||username;
        const user= await userRepository.findByEmailOrUsername(loginIdentifier);

        if(!user){
            throw new ApiError(404,"User doesnot exist");
        }

        const isPasswordValid=await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
           throw new ApiError(401, "Invalid user credentials")
        }

        const {accessToken,refreshToken}= await this.generateAccessAndRefreshTokens(user);
       
        const loggedInUser = await userRepository.findUserWithoutSensitiveFields(user._id);

        return {

            user: loggedInUser,

            accessToken,

            refreshToken

        };

    }






    
}

export default new UserService();