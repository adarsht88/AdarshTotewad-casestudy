const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
let mongoose = require("mongoose");
const expect = chai.expect;
chai.use(chaiHttp);
const server = require("../app.js");
var app = request.agent(server.app);
let should = chai.should();

const User = require('../models/users');




describe('/GET Users', () => {
    it('it should GET all the Users', (done) => {
      chai.request(server.app)
          .get('/signup')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                //res.body.length.should.be.eq(2);
            done();
          });
    });


    it('it should not GET all the User', (done) => {
      chai.request(server.app)
          .get('/signup')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

});



describe('/POST User', () => {
    it('it should add User', (done) => {
        let user = {
            email: "adarsh10@admin",
            password: "1000000"
        }
      chai.request(server.app)
          .post('/signup')
          .send(user)
          .end((err, res) => {
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq("User Created and loged Successfully");
            done();
          });
        afterEach(async () => {
            await Flight.deleteOne({full_name: "Adarsh is Testing..."})
         });
    });


    it('it should not add User', (done) => {
        let user = {
            email: "adarsh1@admin",
            password: "1000000"
        }
      chai.request(server.app)
          .post('/signup')
          .send(user)
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Email already exist");
            done();
          });
    });

    
});




describe('/POST Login', () => {
    it('it should Login User', (done) => {
        let user = {
            email: "adarsh1@admin",
            password: "123456789"
        }
      chai.request(server.app)
          .post('/login')
          .send(user)
          .end((err, res) => {
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq("Login Success: " +user.email);
            done();
          });
        afterEach(async () => {
            await User.deleteOne({full_name: "Adarsh is Testing..."})
         });
    });


    it('it should not login User', (done) => {
        let user = {
            email: "adarsh1@admin",
            password: "1000000"
        }
      chai.request(server.app)
          .post('/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Booking Cancelation request succesffull");
            done();
          });
    });

    
});

