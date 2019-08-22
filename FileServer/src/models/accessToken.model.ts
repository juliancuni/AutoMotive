import * as mongoose from 'mongoose';


const AccessTokenSchema = new mongoose.Schema({
    _id: String,
    ttl: Number,
    domain: String,
    userId: String
});

interface IAccessToken {
    _id: String,
    ttl: Number,
    domain: String,
    userId: String
}


const AccessTokenModel = mongoose.model('AccessToken', AccessTokenSchema, 'AccessToken');

export { AccessTokenModel, IAccessToken }