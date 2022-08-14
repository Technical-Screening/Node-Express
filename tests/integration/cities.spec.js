import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

// base url with fuel type end point
const baseURI = process.env.BASE_URL + 'cities';
// auth url
const authURI = process.env.BASE_URL + 'auth/login';

// declare the token variable in a scope accessible
let token, type;

// get access token from login end point and store it on token
beforeAll((done) => {
  request.post(authURI).send({
    email: process.env.AUTH_USER,
    password: process.env.AUTH_PASS,
  }).end((err, response) => {
    token = response.body.token;
    done();
  });
});

// city controller end points tests
describe('city controller tests', () => {
  // get all city details list
  describe('GET /cities | Get all cities list', () => {
    it('should be return all cities list', async () => {
      // call to cities endpoint. GET
      const response = await request.get(baseURI)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .catch((err) => {
          if (err) throw err;
        });
      
      expect(response.status).toBe(200);
    });
  });
  
  // create a city endpoint. POST
  describe('POST /cities | Create a city detail', () => {
    it('should be create a city', async () => {
      const city = {
        name: 'Test city name',
        addedBy: process.env.USER_ID,
      };
      
      // call to the city endpoint. POST
      await request.post(baseURI)
        .send(city)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
          if (res.status === 200) {
            // set response value to type
            type = res.body;
            
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
              id: res.body.id,
              name: res.body.name,
              createdAt: res.body.createdAt,
            });
          } else {
            expect(res.status).toBe(500);
          }
        }).catch(err => {
          if (err) throw err;
        });
    });
  });
  
  // check city by id
  describe('GET /:id | Get a city by id', () => {
    it('should be return a  city by id', async () => {
      if (type) {
        // call to the city type by id
        const responseId = await request.get(baseURI + '/' + `${type.id}`)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch(err => {
            if (err) throw err;
          });
        
        expect(responseId.status).toBe(200);
        expect(responseId.body).toEqual({
          id: responseId.body.id,
          name: responseId.body.name,
          createdAt: responseId.body.createdAt,
        });
      }
    });
  });
  
  // check unique city name
  describe('GET /:id | Get a city details by id', () => {
    it('should be reject or show error with same city name', async () => {
      const city = {
        name: "Test city name",
        addedBy: process.env.USER_ID,
      };
      
      const response = await request.post(baseURI)
        .send(city)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .catch(err => {
          if (err) throw err;
        });
      
      expect(response.status).toBe(500);
    });
  });
  
  // update existing city name
  describe('PUT /cities/:id | Update city by id', () => {
    it('should be update city details related to the city id', async () => {
      if (type) {
        const city = {
          name: "Update city name"
        };
        
        const response = await request.put(baseURI + '/' + type.id)
          .send(city)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch(err => {
            if (err) throw err;
          });
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          id: response.body.id,
          name: response.body.name,
          createdAt: response.body.createdAt,
        });
      }
    });
  });
  
  // delete existing city details
  describe('DELETE /cities/:id `| Delete city details by id', () => {
    it('should be delete city details by the city id', async () => {
      if (type) {
        await request.delete(baseURI + '/' + type.id)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .send()
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.status).toBe(200);
          })
          .catch(err => {
            if (err) throw err;
          });
      }
    });
  });
});