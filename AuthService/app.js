const express = require('express');
const mongoose = require('mongoose');
//const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();



app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://travis:Adarsh1998@test-adarsh.rhscl.mongodb.net/flight-BS?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(4001,()=>{
      console.log("Litsening to port 4001.")
  }))
  .catch((err) => console.log(err));


app.use(authRoutes);


