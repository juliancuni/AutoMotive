import mongoose from 'mongoose';


const PerdoruesSchema = new mongoose.Schema({
    id: String,
    avatar: String
});

interface IPerdorues {
    id: String,
    avatar: String
}


const PerdoruesModel = mongoose.model('Perdorues', PerdoruesSchema, 'Perdorues');

export { PerdoruesModel, IPerdorues }