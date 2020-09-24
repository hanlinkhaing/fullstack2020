const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Blog'
    }
  ]
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.password;
  },
});

module.exports = new mongoose.model("User", userSchema);
