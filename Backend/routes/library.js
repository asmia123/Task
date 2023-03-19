const express = require("express");

const libraryController = require("../controllers/library");

const router = express.Router();

router.get("/", libraryController.library);

router.get("/:libraryId", libraryController.show);

router.post("/", libraryController.create);

router.put("/:libraryId", libraryController.update);

router.delete("/:libraryId", libraryController.delete);

module.exports = router;