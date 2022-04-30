const Fav = require("../models/favs.models");
const User = require("../models/users.models");

exports.create = async (req, res) => {
  try {
    const {
      body: { userId, ...rest },
    } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User invalid.");
    }
    const fav = await Fav.create({ ...rest, creator: userId });
    user.favs.push(fav._id);
    await user.save({ validateBeforeSave: false });
    res.status(201).json({ message: "Favs created.", fav });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    Fav.find().then((favs) => {
      res.status(200).json({
        message: `${favs.length} favs found.`,
        content: favs,
      });
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

exports.getXIdFavs = async (req, res) => {
  const { favId } = req.params;
  try {
    const favs = await Fav.findById({ _id: favId }).populate("_id");
    res.status(200).json({ message: "Event found.", favs });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong getXIdFavs.", error: e.message });
  }
};

exports.deleteXIdFav = async (req, res) => {
  try {
    const {
      params: { favId },
    } = req;
    const fav = await Fav.findOneAndDelete({ _id: favId });
    if (!fav) {
      res.status(403).json({ message: "Fav did not delete." });
    }
    res.status(200).json({ message: "Fav delete", fav });
  } catch (e) {
    res.status(400).json({ error: "An error has ocurred." });
  }
};
