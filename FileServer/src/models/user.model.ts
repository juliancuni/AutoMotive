import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    id: String,
    avatar: String
});

interface IUser {
    id: String,
    avatar: String
}


const UserModel = mongoose.model('amUser', UserSchema, 'amUser');

export { UserModel, IUser }