const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
let mongoose = require("mongoose");
const expect = chai.expect;
chai.use(chaiHttp);
const server = require("../app.js");
var app = request.agent(server.app);
let should = chai.should();

var Flight = require("../models/flights");

describe('/GET Flight', () => {
    it('it should GET all the Flights', (done) => {
      chai.request(server.app)
          .get('/flight')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                //res.body.length.should.be.eq(2);
            done();
          });
    });
    it('it should not GET all the Flights', (done) => {
      chai.request(server.app)
          .get('/flights')
          .end((err, res) => {
                res.should.have.status(404);
                done();
          });
    });

});



 describe('/POST Flight', () => {
    it('it should add flight', (done) => {
        let book = {
            flight_id:1709,
            name: "Air Asia",
            source: "Mumbai",
            destination: "pune",
            date: "2021-06-19",
            time: "9:30",
            price: 5000
        }
      chai.request(server.app)
          .post('/flight')
          .send(book)
          .end((err, res) => {
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('flight_id').eq(1709);
                res.body.should.have.property('name').eq("Air Asia");
                res.body.should.have.property('source').eq("Mumbai");
                res.body.should.have.property('destination').eq("pune");
                res.body.should.have.property('date').eq("2021-06-19");
                res.body.should.have.property('time').eq("9:30");
                res.body.should.have.property('price').eq(5000);
            done();
          });
        afterEach(async () => {
            await Flight.deleteOne({full_name: "Adarsh is Testing..."})
         });
    });


    it('it should not add flight', (done) => {
        let book = {
            name: "Air Asia",
            source: "Mumbai",
            destination: "pune",
            time: "9:30",
            price: 5000 
        }
      chai.request(server.app)
          .post('/flight')
          .send(book)
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Flight not Added");
                done();
          });
    });
    it('it should not add a flight given the id', (done) => {
        let book = {
            name: "Air Asia",
            source: "Mumbai",
            destination: "pune",
            time: "9:30",
            price: 5000 
        }
      chai.request(server.app)
          .post('/flights')
          .send(book)
          .end((err, res) => {
                res.should.have.status(404);
                done();
          });
    });

    
});


describe('/DELETE/:id book', () => {
    it('it should DELETE a book given the id', (done) => {
            let id = '60d2015d39076e0e7488f544';
              chai.request(server.app)
              .delete('/flight/' + id)
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    it('it should not DELETE a book given the id', (done) => {
            let id = '60d2015d39076e0e7488f544';
                chai.request(server.app)
                .delete('/flights/' + id)
                .end((err, res) => {
                    res.should.have.status(404);
                done();
                });
    });
});






describe('/PATCH/:id book', () => {
    it('it should UPDATE a flight given the id', (done) => {
       let  book = {
            flight_id: 101,
            name: "Air Asia",
            source: "Tirupati",
            destination: "Nanded",
            date: "2021-06-19",
            time: "09:30",
            price: 5000
        }
        id = '60d2015d39076e0e7488f544';
        chai.request(server.app)
        .patch('/flight/'+id)
        .send(book)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');    
        done();
        })
    })
    it('it should UPDATE a flight given the id', (done) => {
        let  book = {
             flight_id: 101,
             name: "Air Asia",
             source: "Tirupati",
             destination: "Nanded",
             date: "2021-06-19",
             time: "09:30",
             price: 5000
         }
         id = '60de7488f544';
         chai.request(server.app)
         .patch('/flight/'+id)
         .send(book)
         .end((err,res)=>{
             res.should.have.status(200);
             res.body.should.be.a('object');    
         done();
         })
     })
     it('it should not update a flight by the given id', (done) => {
        id = '60d2015d39076e0e7488f544';
        chai.request(server.app)
            .get('/flights/'+id)
            .end((err, res) => {
            expect(res).to.have.status(404);
            done();
            });
        }); 

});





describe('/GET/:id flight', () => {
    it('it should GET a flight by the given id', (done) => {
        id = 129;
        chai.request(server.app)
          .get('/flight/'+id)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
    });
    it('it should not GET a flight by the given id', (done) => {
        id = 8009;
        chai.request(server.app)
            .get('/flight/'+id)
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
    });
    it('it should not GET a flight by the given id', (done) => {
        id = 8009;
        chai.request(server.app)
            .get('/flights/'+id)
            .end((err, res) => {
            expect(res).to.have.status(404);
            done();
            });
    });
});

