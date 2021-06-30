const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');


const app = express();

// enable cors to the server
  const corsOpt = {
     origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
     methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
     allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
 };
 app.use(cors(corsOpt)); // cors for all the routes of the application
 app.options('*', cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work


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


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.use(morgan("dev"));






app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://travis:Adarsh1998@test-adarsh.rhscl.mongodb.net/flight-BS?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
   .then( (data) =>{
 	app.listen(4001, () => {
 	console.log("Litsening to port 4001.")
 	})
    app.get("/",(req,res)=>{
 	   res.send("connected");
   });

   }) 

app.use(authRoutes);


module.exports = {
	app,
	authRoutes
   }