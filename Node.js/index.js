require('dotent').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const sequelize = require("./config/db");





app.use(bodyParser.json());
 sequelize
   .authenticate()
   .then(() => {
     console.log("Connection has been established successfully.");
     app.listen(port, () => {
       displayRoutes(app);
     });
   })
   .catch((err) => console.log("Error: " + err));

   app.use((req, res) => {
     res.status(404).json({
       status: false,
       message: notFoundMessage,
     });
   });