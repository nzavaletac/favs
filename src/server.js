require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("./db");
const userRouter = require("./routes/users.routes");
const favsRouter = require("./routes/favs.routes");

const port = process.env.PORT || 8000;
const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "It´s working." });
});

app.use("/auth", userRouter);
app.use("/api", favsRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
