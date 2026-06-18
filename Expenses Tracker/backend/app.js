const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

//!Connect to mongodb
mongoose
  .connect("mongodb://drashti_db_user:bF7NIX93gJs5Q7dO@ac-esxighz-shard-00-00.vpzhayf.mongodb.net:27017,ac-esxighz-shard-00-01.vpzhayf.mongodb.net:27017,ac-esxighz-shard-00-02.vpzhayf.mongodb.net:27017/expensesDB?ssl=true&replicaSet=atlas-v3js9p-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//! Cors config
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
//!Middlewares
app.use(express.json()); //?Pass incoming json data
//!Routes
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/transactions", transactionRouter);
//! Error
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running on this port ${PORT} `)
);