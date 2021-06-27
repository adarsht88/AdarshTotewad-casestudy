const CheckIn = require('../models/seats')
const CheckinService = require('../services/checkinService')




module.exports.checkin_post =  (req,res) => {
    /*
    --comment
    var seat = ["A1","A2","B1","C1"];
    var seatno = seat[Math.floor(Math.random() * seat.length)];
    */
    const seatNo = new CheckIn({
        booking_id:req.body.booking_id,
        seat_no: req.body.seat_no 
    })
    seatNo.save()
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(500).json({ message: "CheckIn not successfull" });
        })    
}



