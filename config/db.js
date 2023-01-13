const e = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sravan_vision:sravan@cluster0.vr3xu.mongodb.net/chatRoom?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => {
  console.error(error);
});
mongoose.connection.on("open", () => {
  console.log("Database is connected");
});