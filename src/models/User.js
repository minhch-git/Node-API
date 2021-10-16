import crypto from 'crypto-js'
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

let jwtSecret = process.env.JWT_SECRET
let jwtExpire = process.env.JWT_EXPIRE

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            "Please add a valid email",
        ],
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true,
})

// Encrypt password using bcrypt 
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods = {
    // Sign JWT and return 
    getSignedJwtToken() {
        return jwt.sign({ id: this._id }, jwtSecret, {
            expiresIn: jwtExpire
        })
    },

    /**
     * Match uer entered password to hashed password in database
     *@params {String} password
     *@return boolean
     * */
    async matchPassword(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },

    // Generate and hash password token
    getResetPasswordToken(){
        // Generate token 
        const resetToken = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex)

        // Hash token and set to resetPasswordToken field
        this.resetPasswordToken = crypto.SHA256(resetToken).toString(crypto.enc.Hex)

        // Set expire
        this.resetPasswordExpire = Date.now()+10*60*1000

        return resetToken
    }
}


export default mongoose.model('User', UserSchema)
