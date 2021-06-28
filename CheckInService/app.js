const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');
const checkInRoutes = require('./routes/checkInRoutes');

const options = {
	swaggerDefinition: {
		openapi: "3.0.1",
		info: {
			title: "CheckIn API",
			version: "1.0.0",
			description: "A Flight CheckIn API",
		},
		servers: [
			{
				url: "http://localhost:4005",
			},
		],
		components: {
			securitySchemes: {
			 bearerAuth: {
			   type: "http",
			   scheme: "bearer",
			   bearerFormat: "JWT",
			 },
		   },
		 },
		 security: [
		   {
			 bearerAuth: [],
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



const dbURI = 'mongodb+srv://travis:Adarsh1998@test-adarsh.rhscl.mongodb.net/checkIn-db?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(4005,()=>{
      console.log("Litsening to port 4005.")
  }))
  .catch((err) => console.log(err));



  app.use(checkInRoutes);


  module.exports = {
	app: app,
	checkInRoutes: checkInRoutes
   }