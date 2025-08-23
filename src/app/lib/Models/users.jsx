const { default: mongoose } = require("mongoose");
const { Schema, model, models } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "name must be at least 3 characters"],
    maxlength: [20, "name can not exceed more then 20 characters"],
    trim:true
  },
   
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    lowercase: true,
    unique:true
  },
  password:{
    type:String,
    trim:true,
    required:true,
    minlength:[6, "password must be at least 6 character"]

  }
 
},
{
    timestamps:true
});
export const User = models.users || model("users", userSchema);
