// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json';
import app from '../src/app';

// Configure chai
chai.use(chaiHttp);
chai.use(chaiJson);
chai.should();
describe('Root', () => {
  describe('GET /appRunning', () => {
    // Test to get all students record
    it('should return a json file with [message: Application is running]', done => {
      chai
        .request(app)
        .get('/appRunning')
        .end((err, res) => {
          // expect(res).to.be.a.jsonFile();
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
