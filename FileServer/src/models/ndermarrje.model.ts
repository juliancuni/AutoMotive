import mongoose from 'mongoose';


const NdermarrjeSchema = new mongoose.Schema({
    id: String,
    logo: String
});

interface INdermarrje {
    id: String,
    logo: String
}


const NdermarrjeModel = mongoose.model('Ndermarrje', NdermarrjeSchema, 'Ndermarrje');

export { NdermarrjeModel, INdermarrje }