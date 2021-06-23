const CheckIn = require('../models/seats')
const CheckinService = require('../services/checkinService')
/*
module.exports = { checkin_post };


async function checkin_post ( req, res ) {
    try {
      // We only pass the body object, never the req object
      const result = await CheckinService.checkin_post( req.body );
      return res.status(200).send( result );
    } catch ( err ) {
      res.status(500).send( err );
    }
  }


*/



module.exports.book_get = (req,res) => {
    Ticket.find()
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(400).send(err)
        })
}




module.exports.checkin_post =  (req,res) => {
    /*
    --comment
    var seat = ["A1","A2","B1","C1"];
    var seatno = seat[Math.floor(Math.random() * seat.length)];
    */
    const seatNo = new CheckIn({
        booking_id:req.body.booking_id,
        flight_id: req.body.flight_id,
        seat_no: req.body.seat_no 
    })
    seatNo.save()
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(500).send(err);
        })    
}



