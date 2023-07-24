const express = require("express");
const connectDb = require('./config/dbConnection');
const errorHandler = require("./middleware/errorHandler");
const dotenv = require('dotenv').config();
connectDb();
const app = express();
const port = process.env.PORT || 5000;
//middleware to parse data from request


app.use(errorHandler);
app.use(express.json());
//using middleware
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require("./routes/userRoutes"));

app.listen( port, ()=>{
    console.log(`Server is running on port ${port}`);
});