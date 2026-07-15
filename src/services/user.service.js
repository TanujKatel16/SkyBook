import { ApiError } from "../utils/ApiError.js";
import userRepository from "../repositories/user.repository.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

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
            emailOrUsername,
            password,
        }=userData;

        const loginIdentifier=emailOrUsername||email||username;

        if (!loginIdentifier || !password) {
            throw new ApiError(400, "username/email and password required");
        }
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

    async logout(userId){
        // 1. Verify the user using verifyJWT middleware.
        // 2. Remove the refreshToken from the database. (in repository)
        // 3. Clear the accessToken cookie. (in controller)
        // 4. Clear the refreshToken cookie.
        // 5. Return "Logout successful".
        const loggedOutUser=await userRepository.removeRefreshToken(userId);

        return loggedOutUser;

    }

    async refreshAccessToken(incomingRefreshToken) {

        // 1. Get refresh token from cookies

        // 2. Verify refresh token using jwt.verify()

        // 3. Find user from decoded token

        // 4. Compare incoming refresh token with the one stored in DB

        // 5. Generate new access token

        // 6. Generate new refresh token

        // 7. Save new refresh token in DB

        // 8. Send both cookies again

        let decodedToken;
        try{
            decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
        }
        catch(error){
            throw new ApiError(401, error.message);
        }
        const user = await userRepository.findById(decodedToken._id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        if(user.refreshToken !== incomingRefreshToken){
            throw new ApiError(401,"Invalid Credentials(refreshToken doesnot match with Db's refreshToken)");
        }
        const {accessToken,refreshToken}= await this.generateAccessAndRefreshTokens(user);
        
        return {  accessToken,refreshToken };

        
    }


}


export default new UserService();