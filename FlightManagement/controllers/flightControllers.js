const Flight = require('../models/flights')

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


module.exports.flight_get = (req,res) => {
    Flight.find()
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>{
                res.status(400).json({ message: "Flights not available" });
        })
}


module.exports.flight_getbyId = (req,res) => {
    const id = req.params.id;
    Flight.findById(id)
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(400).json({ message: "Flight not found" });
        })
}

module.exports.flight_post = async (req,res) => {
    const flight = new Flight(req.body)
    flight.save()
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(400).json({ message: "Flight not Added" });
        })
}


module.exports.flight_update = (req,res) =>{
   const id = req.params.id;
   const updates = req.body;
    Flight.findOneAndUpdate(id,updates)
        .then(()=>{
            Flight.findById(id)
                .then((result)=>{
                    res.status(200).send(result); 
                })
        })
        .catch((err)=>{
            res.status(400).json({ message: "Flight not updated" });
        })
  
}


module.exports.flight_delete = (req,res) => {
    const id = req.params.id;
    Flight.findByIdAndDelete(id)
        .then((result)=>{
            res.status(200).send("Flight deleted");
        })
        .catch((err)=>{
            res.status(400).json({ message: "Flight not deleted" });
        })  

}
