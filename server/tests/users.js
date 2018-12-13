/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import errorHandler from '../helpers/errorhandler';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const user = {
  firstname: 'Olamilekan',
  lastname: 'Ibrahim',
  othernames: 'olamilekan',
  email: 'leksyib14@gmail.com',
  phonenumber: '09052989486',
  password: '12345678',
  username: 'leksyib',
  confirmPassword: '12345678',
  registered: faker.date.recent(),
  isadmin: false,
};

const admin = {
  firstname: 'Olamilekanio',
  lastname: 'Ibrahimovic',
  othernames: 'agbolahan',
  email: 'leksyib13@gmail.com',
  phonenumber: '0905298944386',
  password: '123456785r',
  confirmPassword: '123456785r',
  username: 'leksyib12',
  registered: faker.date.recent(),
  isadmin: true,
};

// authentication routes tests

describe('POST api/v1/auth/signup', () => {
  it('should successfully create a user account if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should successfully create an admin account if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(admin)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should return an error if signup inputs are invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('array');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should return an error if username or email already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'leksyib',
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        registered: faker.date.recent(),
        phonenumber: '21334314543',
        password: '3qwdvf34wedscerscd',
        confirmPassword: '3qwdvf34wedscerscd',
        isadmin: false,
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('string');
        expect(body.error).to.equals(errorHandler[0].message);
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should return an error if passwords do not match', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'leksyib',
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        registered: faker.date.recent(),
        phonenumber: '21334314543',
        password: '3qwdvf34wedscerscd',
        isadmin: false,
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('string');
        expect(body.error).to.equals('Password and confirm password does not match.');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should successfully log a user in if login inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should return an error if login inputs are invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should return an error if login inputs are empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('array');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should return an error if login password is wrong', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: user.username,
        password: '1fiuvjnmwcijnmk3wdc0',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('string');
        done();
      });
  });
});
