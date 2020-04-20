const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require("../../server");
const should = chai.should();
const expect = chai.expect;
const request = require('supertest');
const { users, posts, clearDB, createPost } = require('./util');
chai.use(chaiHttp);

// Posts testing suite
describe('Posts', function() {

    // Run before any tests are executed
    before(function(done) {
        clearDB()
        done();
    });
    
    describe('Create a post', function() {
        it('should', done => {
            chai.request(server)
            .post('/api/users')
            .send(users[2])
            .end((err, res) => {    
                createPost(res.body.token);
            });
            done();
        });
    });
});