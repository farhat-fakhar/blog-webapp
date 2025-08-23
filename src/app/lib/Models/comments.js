import mongoose from "mongoose";
const { model, models, Schema } = mongoose;

const commentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least two characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",  
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [5, "Message must be at least 5 characters"],
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const comment = models.comments || model("comments", commentSchema);
