const mongoose = require('mongoose'),
      checkInSchema = new mongoose.Schema({
        _userID: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
        userName: {type: String, required: true},
        _stadiumID: {type: mongoose.Schema.Types.ObjectId, ref:"Stadium", required: true},
        comment: {type: String, required: true},
        _replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
        stadiumName: {type: String, required: true},
        team: {type: String, required: true},
        
      },{
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    }
    );


    module.exports = mongoose.model('checkIn', checkInSchema)
