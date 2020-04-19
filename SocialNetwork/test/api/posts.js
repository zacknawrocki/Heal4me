const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require("../../server");
const should = chai.should();
const expect = chai.expect;
const request = require('supertest');
chai.use(chaiHttp);

const sampleUser = {
    'name': 'Constable',
    'email': 'constable@gmail.com',
    'password': 'samplePassword'
};