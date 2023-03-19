const mongoose = require("mongoose");
const Book = require("../models/books");
exports.books = async (req, res, next) => {
  try {
    const book = await Book.find().populate("libraryId authorId");
    res.json(book);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.create = async (req, res, next) => {
console.log(req.body);
  const book = {
    libraryId: req.body.libraryId,
    authorId: req.body.authorId,
    bookname: req.body.bookname,
    year: req.body.year
  };
  try {
    console.log(book);
    const savedbook = await Book.create(book);
    res.status(201).json(savedbook);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  } 
  
};

exports.show = async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    const books = await Book.findById(bookId).populate("libraryId authorId");
    res.json(books);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    
    const books = await Book.findByIdAndRemove(bookId);
    res.status(204).json("Book deleted successfully");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.update = async (req, res, next) => {
  const bookId = req.params.bookId;
  const book = {
    libraryId: req.body.libraryId,
    authorId: req.body.authorId,
    bookname: req.body.bookname,
    year: req.body.year,
  };
  
  try {
    console.log(req.body);
    const savedbook = await Book.findByIdAndUpdate(bookId, book);
    res.status(201).json(savedbook);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.search = async (req,res,next) => {
  const q= req.params.q;
  console.log(q);
  try {
    const book = await Book.find().populate("libraryId authorId");
    const keys = ["bookname",];
    const search = (data) => {
      return data.filter((items) =>
      keys.some((key) =>  items[key].toLowerCase().includes(q))
      );
    };
const x = search(book);
res.json(x);
  } catch (err) {
    res.status(500).json(err);
  }
};