const mongoose = require("mongoose");
const Author = require("../models/author");
exports.author = async (req, res, next) => {
  try {
    const author = await Author.find();
    res.json(author);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.create = async (req, res, next) => {

  const author = {
    authorname: req.body.authorname,
    dateofBirth: req.body.dateofBirth,
    genre: req.body.genre,
  };
  try {
    const savedauthor = await Author.create(author);
    res.status(201).json(savedauthor);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  } 
  
};

exports.show = async (req, res, next) => {
  const authorId = req.params.authorId;
  try {
    const authors = await Author.findById(authorId);
    res.json(authors);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res, next) => {
  const authorId = req.params.authorId;
  try {
    
    const authors = await Author.findByIdAndRemove(authorId);
    //console.log(`user destroyed ${users}`);
    res.status(204).json("Author deleted successfully");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.update = async (req, res, next) => {
  const authorId = req.params.authorId;

  const author = {
    authorname: req.body.authorname,
    dateofBirth: req.body.dateofBirth,
    genre: req.body.genre,
  };

  try {
    console.log(req.body);
    const savedauthor = await Author.findByIdAndUpdate(authorId, author);
    res.status(201).json(savedauthor);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};