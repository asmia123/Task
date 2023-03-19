const express = require("express");

const authorController = require("../controllers/author");

const router = express.Router();

router.get("/", authorController.author);

router.get("/:authorId", authorController.show);

router.post("/", authorController.create);

router.put("/:authorId", authorController.update);

router.delete("/:authorId", authorController.delete);

module.exports = router;