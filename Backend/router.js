const usersRoute = require("./routes/user");
const bookRoute = require("./routes/books");
const authorRoute = require("./routes/author");
const libraryRoute = require("./routes/library");

module.exports = function (app) {

  app.use("/users", usersRoute);

   app.use("/books", bookRoute);

  app.use("/author", authorRoute);

  app.use("/library", libraryRoute);

};