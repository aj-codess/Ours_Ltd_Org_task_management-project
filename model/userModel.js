import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
        type: String,
        required: false,
        minlength: 10,
        maxlength: 13,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, 
{ timestamps: true});



userSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

};




userSchema.methods.toJSON = function () {

    const obj = this.toObject();

    delete obj.password;
    
    return obj;

};



const User = mongoose.model("User", userSchema);

export default User;