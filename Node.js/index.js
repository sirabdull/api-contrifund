require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const displayRoutes = require("express-routemap");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const {notFoundMessage} = require("./constant/messages")
const user = require('./Models/userModel')
const otp = require('./Models/otpModels')
const transaction = require('./Models/transactionModel')
const FAQ = require('./Models/faqModel')
const chat = require('./Models/chatModel')
const host = require('./Models/hostModel')
const contribution = require('./Models/contributionModel.')
const contributionPlan = require('./Models/contribution_planModel')
const contributionHistory = require('./Models/contribution_historyModel')
const complain = require('./Models/complaintModel')
const contributor = require('./Models/contributorModel')


app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/user", userRoutes); 


 
app.listen(port, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => console.log("Error: " + err));
  displayRoutes(app);
});

  
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: notFoundMessage,
  });
});

    