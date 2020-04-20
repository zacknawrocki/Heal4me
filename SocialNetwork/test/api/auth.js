const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();
const { users, registerUser, clearDB, } = require('./util');
const User = require('../../models/User');
chai.use(chaiHttp);

// User Auth test suite
describe('User Authentication', function() {

    // Run before any tests are executed
    before(function(done) {
        clearDB();
        done();
    });

    describe('Register', function() {
        // Given: Mock User data
        // Verify: The User was successfully registered
        it('should register a user', done => {
            registerUser(users[0])
            .end((err, res) => {
                res.should.have.status(200);
            });
            done();
        });

        // Given: Mock User data
        // Verify: Registration failed
        it('should throw errors and return status 500', done => {
            registerUser(users[1])
            .end((err, res) => {
                res.should.have.status(200);
            });
            registerUser(users[1])
            .end((err, res) => {
                res.should.have.status(500);
            }); 
            done();
        });
    });
});