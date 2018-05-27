const mongoose = require('mongoose'),
    commentSchema = new mongoose.Schema({
        _userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        _checkInID: { type: mongoose.Schema.Types.ObjectId, ref: "CheckIn", required: true},
        userName: { type: String, required: true },
        _stadiumID: { type: mongoose.Schema.Types.ObjectId, ref: "Stadium", required: true },
        comment: { type: String, required: true },

    }, {
            timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
        }
    );


module.exports = mongoose.model('comment', commentSchema)
