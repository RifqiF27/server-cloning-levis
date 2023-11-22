if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const router = require("./router");
const { connect } = require("./config/mongo");
const app = express();
const port = process.env.PORT || 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(router);


connect().then(() => {
  console.log("success connect to mongoDb");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
