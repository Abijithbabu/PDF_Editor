const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const pdfRoutes = require("./routes/pdf");
const app = express();
require("dotenv").config();

app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'))
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
