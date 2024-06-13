const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sodaTruckSchema = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        sodaStock: { type: Number, required: true },
        iceStock: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const SodaTruck = mongoose.model('SodaTruck', sodaTruckSchema);

module.exports = SodaTruck;