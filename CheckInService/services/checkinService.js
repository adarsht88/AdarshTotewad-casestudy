const CheckIn = require('../models/seats');
const Checkindao = require('./checkindao');


class CheckInService {
    
    constructor () {
      
      this.CheckindaoInstance = new Checkindao( CheckIn );
    }
    async create ( postToCheckIn ) {
        try {
          const result = await this.CheckindaoInstance.create( postToCheckIn );
          return { success: true, body: result };
        } catch ( err ) {
          return { success: false, error: err };
        }
    }

}

module.exports = CheckInService;



/*


module.exports.checkin_post =  (req,res) => {
        
    const seatNo = new CheckIn({
        booking_id:req.body.booking_id,
        flight_id: req.body.flight_id,
        seat_no: req.body.seat_no 
    })
    seatNo.save()
        .then((result)=>{
            return { success: true, body: result };
        })
        .catch((err)=>{
            return { success: false, error: err };
        })    

}




*/

