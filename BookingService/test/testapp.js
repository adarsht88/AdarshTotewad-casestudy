const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
const expect = chai.expect;
chai.use(chaiHttp);
const server = require("../app.js");
var app = request.agent(server.app);
let should = chai.should();


const Ticket = require('../models/tickets');



describe('/POST booking', () => {
    it('it should book flight', (done) => {
        let book = {
            flight_id: 1126,
            quantity: 1,
            classType:"first class"
        }
      chai.request(server.app)
        .post('/flight/book')
        .send(book)
        .end((err, res) => {
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('booking_id');
                res.body.should.have.property('flight_id');
                res.body.should.have.property('quantity').eq(1);
                res.body.should.have.property('classType').eq("first class");
                res.body.should.have.property('total_price').eq(5000);
                res.body.should.have.property('booking_date');
            done();
        });
        afterEach(async () => {
            await Ticket.deleteOne({full_name: "Adarsh is Testing..."})
         });
    });

    it('it should not book flight', (done) => {
        let book = {
            quantity: 5,
            price: 1000
        }
      chai.request(server.app)
          .post('/flight/book')
          .send(book)
          .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              // res.body.should.have.property('errors');
              // res.body.errors.should.have.property('flight_id');
              res.body.should.have.property('message').eql("Booking not succesffull");
          done();
        });

    });
    it('it should not book flight', (done) => {
        let book = {
            flight_id: 1026,
            quantity: 1
        }
      chai.request(server.app)
          .post('/flights/book')
          .send(book)
          .end((err, res) => {
              res.should.have.status(404);
               done();
        });

    });        
});


describe('/DELETE/:id book', () => {
    it('it should not DELETE a book given the id', (done) => {
        let id = 'haz1p';
          chai.request(server.app)
          .delete('/flights/cancel/' + id)
          .end((err, res) => {
                res.should.have.status(404);
            done();
        });
    });
    it('it should DELETE a book given the id', (done) => {
            let id = 'haz1p';
              chai.request(server.app)
              .delete('/flight/cancel/' + id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql("Booking Cancelation request succesffull");

                done();
            });
    });
    it('it should not DELETE a book given the id', (done) => {
        let id = '';
          chai.request(server.app)
          .delete('/flight/cancel/' + id)
          .end((err, res) => {
                res.should.have.status(404);
            done();
        });
    });
});


