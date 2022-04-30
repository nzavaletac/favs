const { Schema, model, models } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The title es required."],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "The desciption is required."],
      trim: true,
      minlength: 5,
      maxlength: 150,
    },
    link: {
      type: String,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: [true, "The user´s ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Fav = model("Favs", eventSchema);
module.exports = Fav;
