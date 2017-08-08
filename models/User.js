const mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs'),
      userSchema = new mongoose.Schema({
        firstName:{type: String, required: true},
        lastName:{type: String, required: true},
        userName:{type: String, required: true},
        email:{type: String, required: true},
        password:{type: String, required: true,select:false},
        _checkIns:{type: mongoose.Schema.Types.ObjectId, ref: 'checkIn'}
      })

      //generates encrypted password
      userSchema.methods.generateHash = function (password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
      }

      //verifies entered password vs encrypted user's password

      userSchema.methods.validPassword = function(password){
        if(!password) return false
        return bcrypt.compareSync(password, this.password)
      }

      //before user save (create or update)
      //if a new password is being used, encrypt it and save it.

      userSchema.pre('save', function(next){
        if(!this.isModified('password')) return(next)
        this.password = this.generateHash(this.password)
        next()
      })

      module.exports = mongoose.model('User', userSchema)
