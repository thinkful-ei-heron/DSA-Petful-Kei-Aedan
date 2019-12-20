const app = require('../src/server');

describe('App', () => {
  let testcat = {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  };
  let testdog = {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  };

  describe('GET endpoints', () => {
    it('GET /api/cats responds with 200 and the first cat if any', () => {
      return supertest(app)
        .get('/api/cats')
        .expect(200, testcat);
    });
    it('/GET /api/dogs returns 200 and the first dog if any', () => {
      return supertest(app)
        .get('/api/dogs')
        .expect(200, testdog);
    }); 
    it('/GET /api/humans returns 200 and the first human if any', () => {
      return supertest(app)
        .get('/api/humans')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.all.keys('stringQu');
          expect(res.body.stringQu).to.equal('Aedan, Zee, Kei, Reif, Heesu, Shannon');
        });
    }); 
  });

  describe('DELETE endpoints', () => {
    it('DELETE /api/cats responds 204 if sucessful', () => {
      return supertest(app)
        .delete('/api/cats')
        .expect(204);
    });
    it('DELETE /api/dogs responds 204 if sucessful', () => {
      return supertest(app)
        .delete('/api/dogs')
        .expect(204);
    });
    it('DELETE /api/humans responds 204 if sucessful', () => {
      return supertest(app)
        .delete('/api/humans')
        .expect(204);
    });
  });
});
