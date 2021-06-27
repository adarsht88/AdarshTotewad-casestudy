const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
let mongoose = require("mongoose");
const expect = chai.expect;
chai.use(chaiHttp);
const server = require("../app.js");
var app = request.agent(server.app);
let should = chai.should();

var checkIn = require("../models/seats");




describe('/POST checkin', () => {
    it('it should check In', (done) => {
        let book = {
            booking_id:"mjlxu",
            seat_no:"A60"  
        }
      chai.request(server.app)
          .post('/book/checkin')
          .send(book)
          .end((err, res) => {
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('booking_id').eq("mjlxu");
                res.body.should.have.property('seat_no').eq("A60");
            done();
          });
        afterEach(async () => {
            await checkIn.deleteOne({full_name: "Adarsh is Testing..."})
         });
    });


    it('it should not check In', (done) => {
        let book = {
            booking_id:"mjlxu" 
        }
      chai.request(server.app)
          .post('/book/checkin')
          .send(book)
          .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("CheckIn not successfull");
            done();
          });
    });

    it('it should not check In', (done) => {
        let book = {
            booking_id:"mjlxu",
            flight_id:129,
            seat_no:{}  
        }
      chai.request(server.app)
          .post('/book/checkin')
          .send(book)
          .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.errors.flight_id.should.have.property('message').eql("CheckIn not successfull");
            done();
          });
    });

});







/*

it('OK, creating a new note works', (done) => {
    request(server.app).post('/book/checkin')
      .send({ 
          booking_id:"malxu",
          flight_id:109,
          seat_no:"A10"   
        })
      .then((res) => {
        res.body.data.should.have.property('_id');
        res.body.data.should.have.property('booking_id').eq("malxu");
        res.body.data.should.have.property('flight_id').eq(109);
        res.body.data.should.have.property('seat_no').eq("A10");
        done();
      })
      .catch((err) => done(err));
  });




*/






/*


describe("POST Request.", function(){
    describe("Adding a new user into the users collection of the Deals and Coupons Finder's Users Database.",function(){
        it("Successful insertion should return status code equal to 200.", async function(){
            let res = await chai
        	.request(server.app)
        	.post('/book/checkin').send({
                booking_id:"malxu",
                flight_id:109,
                seat_no:"A10"  
    })

    expect(res.status).to.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('_id');
    res.body.data.should.have.property('booking_id').eq("malxu");
    res.body.data.should.have.property('flight_id').eq(109);
    res.body.data.should.have.property('seat_no').eq("A10");
     });
     afterEach(async () => {
    	await checkIn.deleteOne({full_name: "Adarsh is Testing..."})
	    });
    });
});

*/


/*
describe("POST Request", () =>{
    it("It should POST a new task", (done)=> {
    const task = {
        booking_id:"malxu",
        flight_id:109,
        seat_no:"A10"  
    };
    chai.request (server)
    .post("/book/checkin")
    .send(task)
    .end((err, response)=> {
        response. should.have.status (200);
        response.body.should.be.at('object');
        response.body.should.have.property(id);
        response.body.should.have.property('booking_id').eq("malxu");
        response.body.should.have.property('flight_id').eq(109);
        response.body.should.have.property('seat_no').eq("A10");
    done();
    });
    afterEach(async () => {
    	await checkIn.deleteOne({full_name: "Adarsh is Testing..."})
	    });
    });
});
*/