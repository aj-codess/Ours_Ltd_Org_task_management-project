import mongoose from "mongoose";
import bcrypt from "bcrypt";


const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > Date.now();
        },
        message: "Due date must be a future date",
      },
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    assignedTo: [{
        type: String
      }],
  }, {
    timestamps: true,
  });



const adminSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    adminName: {
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
    task:[taskSchema],
    isActive: {
        type: Boolean,
        default: true,
    },
}, 
{ timestamps: true});



adminSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

};




adminSchema.methods.toJSON = function () {

    const obj = this.toObject();

    delete obj.password;
    
    return obj;

};



const admin = mongoose.model("Admin", adminSchema);

export default admin;