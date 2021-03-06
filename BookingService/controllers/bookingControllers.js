const Ticket = require('../models/tickets');
const axios = require('axios');
const isAuthenticated = require('../../middlewares/isAuthenticated');

const nodemailer = require("nodemailer");
const TeleSignSDK = require('telesignsdk');

//TeleSignSDK credentials
const customerId = "72871F7A-2B23-4352-8CA8-F4532EFA5076";
const apiKey = "IVf4WlwmUShtZN1psnPyrwy/29WnKObI6629mFjHew2Hf2WFnSL7E/gp+97Ds+5btdnK2q5vhdsaJBORrvPZNw==";
const rest_endpoint = "https://rest-api.telesign.com";


const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint
);

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'travisat07@gmail.com', // generated ethereal user
        pass: '8208130741adarsh'  
    },
    tls:{
      rejectUnauthorized:true
    }
  });

  // setup email data with unicode symbols
  



module.exports.book_getinfo = (req,res) => {
    const id = req.params.id;
    Ticket.find({flight_id:id})
        .then((Booking_Details)=>{
            if(Booking_Details){
                axios.get("http://localhost:4002/flight/"+id)
                    .then((result)=>{
                        const Flight_Details = result.data ;
                        const msg = {Booking_Details, Flight_Details };
                        res.status(200).send(msg);
                    })
                }else{
                res.send("axiosfail")
            }
        })
        .catch((err)=>{
            res.send(err)
        })
}




module.exports.book_post =  (req,res) => {

    const quantity = parseInt(req.body.quantity);
    const flight_id= req.body.flight_id;
    const classType = req.body.classType;
    let price;
    if(classType === "first class"){
        price = 5000;
    }else if(classType === "business class"){
        price = 2500;
    }else{
        //Economy Class
        price = 1000;
    }


    const booking_id = Math.random().toString(36).substr(2, 5);
    let total = quantity*price;
    //console.log(isAuthenticated.userEmail);
    
    let book_mailOptions = {
        from: 'travisat07@gmail.com', // sender address
        to: 'travisat07@gmail.com', // list of receivers
        subject: 'Booking Conformation.', // Subject line
        text: `Your Booking is succesfull. Booking id is:  ${booking_id} , flight id : ${flight_id} , classType : ${classType} and Price is: ${total}` // plain text body
    };
    

    const phoneNumber = "8208130741";
    const message = `Your Booking is succesfull. Booking id is:  ${booking_id} , flight id : ${flight_id} and Price is: ${total}`;

    function messageCallback(error, responseBody) {
        if (error === null) {
            console.log("SMS sent");
        } else {
            console.error("Unable to send message. " + error);
        }
    }

    const book_ticket = new Ticket({
        booking_id,
        flight_id: req.body.flight_id,
        quantity,
        classType,
        total_price:total
    })
    book_ticket.save()
        .then((result)=>{
            transporter.sendMail(book_mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("email sent");
            });
            client.sms.message(messageCallback, phoneNumber, message,"ARN");          
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(400).json({ message: "Booking not succesffull"});
        })    
}




module.exports.book_delete = (req,res) => {
    const id = req.params.id;


    let cancel_mailOptions = {
        from: 'travisat07@gmail.com', // sender address
        to: 'travisat07@gmail.com', // list of receivers
        subject: 'Booking Cancel Conformation.', // Subject line
        text: `Your Booking Cancellation request is succesfull. Booking id was: ${id}` // plain text body
    };
    Ticket.findOneAndDelete(id)
        .then((result)=>{
            transporter.sendMail(cancel_mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("email sent");
            });
            res.status(200).json({ message: "Booking Cancelation request succesffull"});
        })
        .catch((err)=>{
            res.status(400).json({ message: "Booking Cancelation request not succesffull"});
        })
}




