const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/searchRoutes')
const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');


const options = {
	swaggerDefinition: {
		openapi: "3.0.1",
		info: {
			title: "Search API",
			version: "1.0.0",
			description: "A Flight Search API",
		},
		servers: [
			{
				url: "http://localhost:4003",
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
  .then((result) => app.listen(4003,()=>{
      console.log("Litsening to port 4003.")
  }))
  .catch((err) => console.log(err));


app.use(searchRoutes);

module.exports ={
app,
searchRoutes
}