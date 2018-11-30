/* eslint-disable no-undef */
import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);


describe('GET api/v1/red-flags', () => {
  it('should return all available red-flag records', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
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

describe('GET api/v1/red-flags/:id', () => {
  it('should return a red-flag record with a specific id', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags/2')
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

describe('GET api/v1/red-flags/:id (id is non-existent)', () => {
  it('should return an error if a user attempts to make a request for an unexistent record id', (done) => {
    chai.request(app)
      .get(`/api/v1/red-flags/${faker.random.number() + faker.random.number()}`)
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

describe('POST api/v1/red-flags', () => {
  it('should create a record if user input is valid', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags/')
      .send({
        location: `${faker.address.longitude()}, ${faker.address.latitude()}`,
        comment: `${faker.random.words()}`,
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
        expect(body.data[0].message).to.be.equals('Created red-flag record');
        done();
      });
  });
});

describe('POST api/v1/red-flags', () => {
  it('should return an error if user input is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags/')
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
        expect(body.error).to.be.equals('Please fill in the location and comment.');
        done();
      });
  });
});

describe('PATCH api/v1/red-flags/:id/location', () => {
  it('should edit the location value of a record if it exists', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/1/location')
      .send({
        location: '543.3213, 423.242',
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

describe('PATCH api/v1/red-flags/:id/location', () => {
  it('should return an error if the record of that id is non-existent', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/non-existent-stuff/location')
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
        expect(body.error).to.equals('No record was found with the given id.');
        done();
      });
  });
});

describe('PATCH api/v1/red-flags/:id/location', () => {
  it('should return an error if the location field is empty', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/1/location')
      .send({
        location: undefined,
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equals('Location is required.');
        done();
      });
  });
});

describe('PATCH api/v1/red-flags/:id/comment', () => {
  it('edit the comment value of a record if it exists', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/1/comment')
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

describe('PATCH api/v1/red-flags/:id/comment', () => {
  it('should return an error if the id is not existing', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/non-existing-id/comment')
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

describe('PATCH api/v1/red-flags/:id/comment', () => {
  it('should return an error if the comment field is empty', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/1/comment')
      .send({
        comment: undefined,
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equals('Comment is required.');
        done();
      });
  });
});

describe('Delete api/v1/red-flags/:id/', () => {
  it('should delete a record by id if it exists', (done) => {
    chai.request(app)
      .delete('/api/v1/red-flags/1/')
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

describe('Delete api/v1/red-flags/:id/', () => {
  it('should delete a record by id if it doesn\'t exist', (done) => {
    chai.request(app)
      .delete('/api/v1/red-flags/1/')
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
