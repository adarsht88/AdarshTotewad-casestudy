const express = require('express');
const mongoose = require('mongoose');
//const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');


const options = {
	swaggerDefinition: {
		openapi: "3.0.1",
		info: {
			title: "Auth Management API",
			version: "1.0.0",
			description: "A Auth Management API",
		},
		servers: [
			{
				url: "http://localhost:4001",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.use(cors());
app.use(morgan("dev"));



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


module.exports = {
	app,
	authRoutes
   }