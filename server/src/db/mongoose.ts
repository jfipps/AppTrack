const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_DB_ADDRESS, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch((err: Error) => {
    console.log(err);
  });
