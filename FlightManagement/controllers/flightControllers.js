const Flight = require('../models/flights')




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
    console.log(id);
    Flight.find({flight_id:id})
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
    Flight.findOneAndDelete(id)
        .then((result)=>{
            res.status(200).send("Flight deleted");
        })
        .catch((err)=>{
            res.status(400).json({ message: "Flight not deleted" });
        })  

}
