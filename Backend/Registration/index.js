/* eslint-disable no-undef */
// server.js
const express = require('express');
const port='8000'
const UserRouter = require('../Routes/user.routes.js')
const AddJobRouter=require('../Routes/AddJob.routes.js')

const cors = require('cors');
const app = express();
app.get('/', (req, res) => {
  res.send("hii")
})

require('../db/connection');

app.use(cors());
app.use(express.json());
// =========SignUp/Login
app.use('/UserLogin', UserRouter);
app.use('/UserRegistration', UserRouter);
// ==============AddJOb
app.use('/Addnewjob',AddJobRouter)
 


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

