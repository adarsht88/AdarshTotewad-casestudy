const express = require('express');
const mongoose = require('mongoose');
const flightRoutes = require('./routes/flightRoutes')
const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');


const options = {
	swaggerDefinition: {
		openapi: "3.0.1",
		info: {
			title: "Flight Management API",
			version: "1.0.0",
			description: "A Flight Management API",
		},
		servers: [
			{
				url: "http://localhost:4002",
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



const dbURI = 'mongodb+srv://travis:Adarsh1998@test-adarsh.rhscl.mongodb.net/flightmanagement?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true,useFindAndModify:false, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(4002,()=>{
      console.log("Litsening to port 4002.")
  }))
  .catch((err) => console.log(err));


app.use(flightRoutes);


module.exports = {
	app: app,
	flightRoutes: flightRoutes
   }