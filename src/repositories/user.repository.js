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
    async findUserWithoutSensitiveFields(id){

        return await User.findById(id)
        .select("-password -refreshToken");

    }
    async updateRefreshToken(_id, refreshToken) {

        return await User.findByIdAndUpdate(

            _id,

            {
                $set: {
                    refreshToken
                }
            },

            {
                new: true
            }

        );

    }

}
export default new UserRepository();