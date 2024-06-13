const mongoose = require('mongoose');

const flavorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    mixins: [String],
});

module.exports = mongoose.model('Flavor', flavorSchema);