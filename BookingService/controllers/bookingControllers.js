const Ticket = require('../models/tickets')

/*

const handleErrors = (err)=>{
    console.log(err.message, err.code);
    let errors = {email: '', password:''};

    if(err.code == 11000){
        errors.email = "Email is already registerd.";
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(error =>{
            error[error.properties.path] = error.properties.message;
        });
    }
    return errors;
}

*/


module.exports.book_get = (req,res) => {
    Ticket.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            res.send(err)
        })
}




module.exports.book_post =  (req,res) => {
    const quantity = parseInt(req.body.quantity);
    const price = parseInt(req.body.price);
    const booking_id = Math.random().toString(36).substr(2, 5);
    let total = quantity*price;
   /*
    function total_price(price,quantity){
        for(let t=0;t<quantity.length;++t){
            total += price;
        }
    }
    total_price(price,quantity);
    */
    const book_ticket = new Ticket({
        booking_id,
        flight_id: req.body.flight_id,
        user_id: req.body.user_id,
        quantity,
        total_price:total
    })
    book_ticket.save()
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(400).send(err);
        })    
}




module.exports.book_delete = (req,res) => {
    const id = req.params.id;
   
    Ticket.findOneAndRemove(id)
        .then((result)=>{
            res.status(200).send('Booking Canceled.');
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
    
}


