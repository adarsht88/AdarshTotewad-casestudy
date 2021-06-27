const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
let mongoose = require("mongoose");
const expect = chai.expect;
chai.use(chaiHttp);
const server = require("../app.js");
var app = request.agent(server.app);
let should = chai.should();
var assert = require("assert");


const Search = require('../models/search');



describe('/GET/:id flight', () => {
    it('it should GET a flight by the given id', (done) => {
        chai.request(server.app)
          .get('/flight/search?source=pune&destination=nanded')
          .end((err, res) => {
            expect(res).to.have.status(200);
            res.body.should.be.a('array');
            // let arr = res.body;
            // assert.equal(arr.length, 2);
            done();
          });
    });

    it('it should not GET a flight by the given id', (done) => {
        chai.request(server.app)
          .get('/flight/search?source=pune&destination=')
          .end((err, res) => {
            expect(res).to.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Query is invalid");
        
            done();
          });
        });
});