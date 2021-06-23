const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkinSchema = new Schema({
    booking_id: {
        type:String,
        required:true       
    }, 
    flight_id: {
        type:Number,
        required:true       
    },
    seat_no: {
        type:String,
        required:true
    }
}) 

const CheckIn = mongoose.model('SeatNo',checkinSchema);
module.exports = CheckIn;