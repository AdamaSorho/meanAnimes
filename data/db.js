const mongoose = require("mongoose");
require("../models/anime");

mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected to", process.env.DB_NAME);
});

mongoose.connection.on("error", function (error) {
  console.log("Mongoose connection error", error);
});

//App stopped by ctrl+c
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(process.env.SIGINT_MESSAGE);
    process.exit(0);
  });
});

//App terminated
process.on("SIGTERM", function () {
  mongoose.disconnect(function () {
    console.log(process.env.SIGTERM_MESSAGE);
    process.exit(0);
  });
});

//App restarted
process.on("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log(process.env.SIGUSR2_MESSAGE);
    process.exit(0);
  });
});