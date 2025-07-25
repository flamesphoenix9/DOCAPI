require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authmiddleware = require('./middleware/authentication');
const adminmiddleware = require('./middleware/adminOnly');

const authRouter = require('./routes/auth');
const adminRouter = require("./routes/admin");
const docRouter = require("./routes/document")

app.use(express.json());

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/admin", authmiddleware,adminmiddleware, adminRouter);
app.use("/api/v1/documents", authmiddleware, docRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
} 
start();