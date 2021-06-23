const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    booking_id: {
        type:String,
        required:true       
    }, 
    booking_date: {
        type: Date,
        default: Date.now
    },
    flight_id: {
        type:Number,
        required:true       
    },
    user_id: {
        type:String,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    },
    total_price: {
        type:Number,
        required:true
    }
}) 

const Ticket = mongoose.model('Ticket',ticketSchema);
module.exports = Ticket;