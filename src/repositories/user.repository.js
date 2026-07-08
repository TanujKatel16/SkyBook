import {User} from "../models/user.model.js";

class UserRepository{

    async findByEmail(email){
         
        return await User.findOne({email});

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
}
export default new UserRepository();