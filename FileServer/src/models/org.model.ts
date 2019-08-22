import mongoose from 'mongoose';


const OrgSchema = new mongoose.Schema({
    id: String,
    logo: String
});

interface IOrg {
    id: String,
    logo: String
}


const OrgModel = mongoose.model('org', OrgSchema, 'org');

export { OrgModel, IOrg }