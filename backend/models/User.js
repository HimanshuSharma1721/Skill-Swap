const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,         // ✅ prevents duplicate accounts
      lowercase: true,      // ✅ stores as lowercase so "Test@gmail.com" == "test@gmail.com"
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    skillsOffered: {
      type: [String],
      default: [],
    },

    skillsWanted: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // ✅ adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);