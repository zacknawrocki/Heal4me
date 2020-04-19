const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();
chai.use(chaiHttp);

// Clean up function for deleting mock Users
const deleteUserByEmail = (email) => {
    chai.request(server)
        .delete('/api/users/')
        .send({email: email})
        .end((err, res) => {
            if (err) throw err;
            console.log(`User with email ${email} was successfully deleted`);
    });
}

// Given: Mock User data
// Verify: The User was successfully registered
describe('User Authentication', function() {
    describe('Register', function() {
        const sampleUser = {
            'name': 'AstronautNeil',
            'email': 'astronautneil@gmail.com',
            'password': 'samplePassword'
        };
        
        it('should register a user', done => {
            chai.request(server)
            .post('/api/users')
            .send(sampleUser)
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                deleteUserByEmail('astronautneil@gmail.com');
            });
            done();
        });
    });
});

// Given: Mock User data
// Verify: The User was not successfully registered
describe('User Authentication', function() {
    describe('Register Failed', function() {
        const sampleUser = {
            "name": "AstronautNeil",
            "email": "astronautneil@gmail.com",
            "password": "sampl"
        };
        
        it('should throw errors and return status 400', done => {
            chai.request(server)
            .post("/api/users")
            .send(sampleUser)
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(400);
            });
            done();
        });
    });
});