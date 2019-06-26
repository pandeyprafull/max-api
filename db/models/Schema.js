const mongoose = require('../connection');
const Schema = mongoose.Schema;
const CreatureSchema = new Schema({
    name: String,
    type : String,
    habitat : String,
    numLegs : Number,
    isDangerous : Boolean,
    imageUrl  :String
})
const CreatureModel = mongoose.model('creature',CreatureSchema);
exports.Creature = CreatureModel;

