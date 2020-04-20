const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const User = require('../../models/User');
const Post = require('../../models/Post');
chai.use(chaiHttp);

// Empty the database
const clearDB = () => {
    User.deleteMany({}, function(err) {
        if (err) throw err;
    })
    Post.deleteMany({}, function(err) {
        if (err) throw err;
    });
};

// Create a post given 
const createPost = (token) => {
    chai.request(server)
    .post('/api/posts')
    .set('x-auth-token', token)
    .send(posts[0])
    .end((err, res) => {
        res.should.have.status(200);
    });

};

// Register a mock User via an object containing name, email, password
const registerUser = (credentials) => {
    return chai.request(server)
    .post('/api/users')
    .send(credentials);
};

const users = [
    {
        'name': 'AstronautNeil',
        'email': 'astronautneil@gmail.com',
        'password': 'samplePassword'
    },
    {
        'name': 'AstronautTom',
        'email': 'astronauttom@gmail.com',
        'password': 'samplePassword'
    },
    {
        'name': 'Constable',
        'email': 'constable@gmail.com',
        'password': 'samplePassword'
    }
];

const posts = [
    {
        'text': 'Sample test post.'
    }
];

module.exports = {
    clearDB,
    registerUser,
    createPost,
    users,
    posts
};