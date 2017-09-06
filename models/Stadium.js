const mongoose = require('mongoose'),
      stadiumSchema = new mongoose.Schema({
        stadiumName: {type: String, required: true},
        team: {type: String, required: true},
        location: {type: String, required: true},
        firstPlayed: {type: Number, required: true},
        capacity: {type: Number, required: true},
        yearBuilt: {type: Number, required: true},
        playingSurface: {type: String, required: true},
        fieldDimensions: {type: String, required: true},
        stadiumCordinates: {type: String, required: true},
        picURL: {type: String}
      })

      module.exports = mongoose.model('Stadium', stadiumSchema)
