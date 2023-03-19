const express = require("express");

const bookController = require("../controllers/books");

const router = express.Router();

router.get("/", bookController.books);

router.get("/search", bookController.search);

router.get("/:bookId", bookController.show);

router.post("/", bookController.create);

router.put("/:bookId", bookController.update);

router.delete("/:bookId", bookController.delete);

router.get("/search/:q", bookController.search);

module.exports = router;