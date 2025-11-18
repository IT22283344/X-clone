const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkid: {
      type: String,
      reqired: true,
      unique: true,
    },

    email: {
      type: String,
      reqired: true,
      unique: true,
    },

    firstname: {
      type: String,
      reqired: true,
    },

    lastname: {
      type: String,
      reqired: true,
    },

    username: {
      type: String,
      reqired: true,
      unique: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    bannerImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxLength: 160,
    },

    location: {
      type: String,
      default: "",
    },

    follwers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("User", userSchema);
export default Post;