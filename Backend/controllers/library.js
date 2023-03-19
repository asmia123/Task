const mongoose = require("mongoose");
const Library = require("../models/library");
exports.library = async (req, res, next) => {
  try {
    const libraries = await Library.find();
    res.json(libraries);
  } catch (err) {
    res.status(500).json(err);
  }
};
   
exports.create = async (req, res, next) => {
  const library = {
    libraryname: req.body.libraryname,
    address: req.body.address
  };
  try {
    const savedlibrary = await Library.create(library);
    res.status(201).json(savedlibrary);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.show = async (req, res, next) => {
  const libraryId = req.params.libraryId;
  try {
    const library = await Library.findById(libraryId);
    // const athlete = await Athlete.find({category_id:categoryId});
    // console.log({category,athlete});
    // res.json({category,athlete});
    res.json(library);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res, next) => {
  const libraryId = req.params.libraryId;
  try {
    const library = await Library.findByIdAndRemove(libraryId);
    res.status(201).json("Library deleted successfully");
  } catch (err) {
console.log(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res, next) => {
  const libraryId = req.params.libraryId;
  const library = {
    libraryname: req.body.libraryname,
    address: req.body.address
  };
  
  try {
    const savedlibrary = await Library.findByIdAndUpdate(libraryId, library);
    res.status(201).json(savedlibrary);
  } catch (err) {
    res.status(500).json(err);
  }
};