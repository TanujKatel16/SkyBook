import {User} from "../models/user.model.js";

class UserRepository{

    async findByEmail(email){
         
        return await User.findOne({email});

    }
    async findByEmailOrUsername(loginIdentifier) {
        return await User.findOne({
            $or: [
                { email: loginIdentifier },
                { username: loginIdentifier }
            ]
        });
    }
    async findById(_id){
        return await User.findById(_id);
    }
    async findByUsername(username){
        return await User.findOne({username});
    }
    async createUser(userData){
        return await User.create(userData);
    }
    async findUserWithoutSensitiveFields(_id){

        return await User.findById(_id)
        .select("-password -refreshToken");

    }
    async updateRefreshToken(_id, refreshToken) {

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                $set: {
                    refreshToken
                }
            },
            {
                
               returnDocument: "after"

            }
            
        );

        return updatedUser;
    }

    async removeRefreshToken(_id){

        const loggedOutUser = await User.findByIdAndUpdate(
            _id,
            {
                $unset:{
                    refreshToken : 1
                }

            },
            {
                returnDocument: "after"
            }
        )

        return loggedOutUser;

    }

}
export default new UserRepository();