
const CheckIn = require('../models/seats');
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'travisat07@gmail.com', // generated ethereal user
        pass: '8208130741adarsh'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:true
    }
  });

module.exports.checkin_post =  (req,res) => {
    /*
    --comment
    var seat = ["A1","A2","B1","C1"];
    var seatno = seat[Math.floor(Math.random() * seat.length)];
    */
    const booking_id=req.body.booking_id;
    const seat_no =req.body.seat_no;

    let checkin_mailOptions = {
        from: 'travisat07@gmail.com', // sender address
        to: 'travisat07@gmail.com', // list of receivers
        subject: 'Check In Conformation.', // Subject line
        text: `Your CheckIn is succesfull. Booking id is:  ${booking_id} , Seat No. : ${seat_no}` // plain text body
    };
    const seatNo = new CheckIn({
        booking_id,
        seat_no
    })
    seatNo.save()
        .then((result)=>{
            transporter.sendMail(checkin_mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("email sent");
            });          
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(500).json({ message: "CheckIn not successfull" });
        })    
}



