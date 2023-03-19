const dotenv = require("dotenv");

dotenv.config();
module.exports = function (app) {
  try{
    app.listen(process.env.PORT || 3000);
    console.log("Running on 3000")
  }catch(err)
  {
    console.log(err);
  }
  
};