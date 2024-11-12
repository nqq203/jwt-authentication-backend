require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.route');
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "*",
    credentials: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user/", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});