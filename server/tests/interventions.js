/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
// import errorHandler from '../helpers/errorhandler';
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

let token;
let adminToken;

// authentication routes tests

describe('POST api/v1/auth/login', () => {
  it('should successfully login a user account if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        token = body.data[0].token;
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
  it('should successfully login an admin account if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        adminToken = body.data[0].token;
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

describe('GET api/v1/intervention', () => {
  it('should return an empty array and status 204 if records are empty', (done) => {
    chai.request(app)
      .get('/api/v1/intervention')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(204);
        expect(body.data.length).to.be.equals(0);
        done();
      });
  });
});

describe('POST api/v1/intervention', () => {
  it('should create a record if user input is valid', (done) => {
    chai.request(app)
      .post('/api/v1/intervention/')
      .set({ 'x-access-token': token })
      .send({
        location: `${faker.address.longitude()}, ${faker.address.latitude()}`,
        comment: `${faker.random.words()} ${faker.random.words()}`,
        type: 'red-flag',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.be.an('object');
        expect(body.data[0].message).to.be.a('string');
        expect(body.data[0]).to.haveOwnProperty('id' && 'message');
        expect(body.data[0].message).to.be.equals('Created intervention record');
        done();
      });
  });
});

describe('POST api/v1/intervention', () => {
  it('should return an unauthorized error if there is no header token', (done) => {
    chai.request(app)
      .post('/api/v1/intervention/')
      .send({
        location: `${faker.address.longitude()}, ${faker.address.latitude()}`,
        comment: `${faker.random.words()} ${faker.random.words()}`,
        type: 'red-flag',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('error');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.equals('Unauthorized!, you have to login first');
        done();
      });
  });
});

describe('POST api/v1/intervention', () => {
  it('should return an unauthorized error if there is an invalid jwt token', (done) => {
    chai.request(app)
      .post('/api/v1/intervention/')
      .set('x-access-token', '34wedcijnemwfecdokjin3jfwekmdcpjirefkmdcls')
      .send({
        location: `${faker.address.longitude()}, ${faker.address.latitude()}`,
        comment: `${faker.random.words()} ${faker.random.words()}`,
        type: 'red-flag',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('error');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.equals('Invalid token, you have to login first');
        done();
      });
  });
});

describe('POST api/v1/intervention', () => {
  it('should return an error if user input is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/intervention/')
      .set({ 'x-access-token': token })
      .send({
        location: undefined,
        comment: undefined,
        type: undefined,
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('GET api/v1/intervention', () => {
  it('should return all available red-flag records', (done) => {
    chai.request(app)
      .get('/api/v1/intervention')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('id');
        done();
      });
  });
});

describe('GET api/v1/intervention/:id', () => {
  it('should return a red-flag record with a specific id', (done) => {
    chai.request(app)
      .get('/api/v1/intervention/2')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('status' && 'data');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('id' && 'comment' && 'location' && 'type');
        done();
      });
  });
});

describe('GET api/v1/intervention/:id (id is non-existent)', () => {
  it('should return an error if a user attempts to make a request for an unexistent record id', (done) => {
    chai.request(app)
      .get(`/api/v1/intervention/${faker.random.number() + faker.random.number()}`)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('error');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.equal('No record was found with the given id.');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/location', () => {
  it('should edit the location value of a record if it exists', (done) => {
    chai.request(app)
      .patch('/api/v1/intervention/2/location')
      .set({ 'x-access-token': token })
      .send({
        location: '543.3213,423.242',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data[0]).to.haveOwnProperty('message');
        expect(body.data[0]).to.haveOwnProperty('id' && 'message');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/location', () => {
  it('should return an error if the record of that id is non-existent', (done) => {
    chai.request(app)
      .patch('/api/v1/intervention/3223432345432432/location')
      .set({ 'x-access-token': token })
      .send({
        location: '543.3213, 423.242',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/location', () => {
  it('should return an error if the location field is empty', (done) => {
    chai.request(app)
      .patch('/api/v1/intervention/2/location')
      .set({ 'x-access-token': token })
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/comment', () => {
  it('edit the comment value of a record if it exists', (done) => {
    chai.request(app)
      .patch('/api/v1/intervention/2/comment')
      .set({ 'x-access-token': token })
      .send({
        comment: faker.random.words(),
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data[0]).to.haveOwnProperty('id' && 'message');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/comment', () => {
  it('should return an error if the id is not existing', (done) => {
    chai.request(app)
      .patch('/api/v1/intervention/5432345/comment')
      .set({ 'x-access-token': token })
      .send({
        comment: faker.random.words(),
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/status', () => {
  it('should return a 403 error if the user is not an admin', (done) => {
    chai.request(app)
      .patch('/api/v1/intervention/2/status')
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(403);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.equals('Unauthorized. Only an admin can perform this operation.');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/status', () => {
  it('should successfully change the status of a record is the user is an admin', (done) => {
    chai.request(app)
      .patch('/api/v1/intervention/2/status')
      .set({ 'x-access-token': adminToken })
      .send({
        status: 'resolved',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data[0].message).to.equals('Updated red-flag record\'s status');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/status', () => {
  it('should return an error if status is empty', (done) => {
    chai.request(app)
      .patch('/api/v1/intervention/2/status')
      .set({ 'x-access-token': adminToken })
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.an('array');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/comment', () => {
  it('should return an error if the comment field is empty', (done) => {
    chai.request(app)
      .patch('/api/v1/intervention/2/comment')
      .set({ 'x-access-token': token })
      .send({
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('Delete api/v1/intervention/:id/', () => {
  it('should delete a record by id if it exists', (done) => {
    chai.request(app)
      .delete('/api/v1/intervention/2/')
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data[0]).to.haveOwnProperty('id' && 'message');
        done();
      });
  });
});

describe('Delete api/v1/intervention/:id/', () => {
  it('should not delete a record by id if it doesn\'t exist, return error', (done) => {
    chai.request(app)
      .delete('/api/v1/intervention/53423123435423432/')
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.equals('No record was found with the given id.');
        done();
      });
  });
});

describe('POST any unexistent route', () => {
  it('should return an error with status 404 that the endpoint does not exist', (done) => {
    chai.request(app)
      .post('/tre')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.a('string');
        expect(body.error).to.equals('This page does not exist.');
        done();
      });
  });
});
