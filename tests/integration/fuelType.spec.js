import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

// base url with fuel type end point
const baseURI = process.env.BASE_URL + 'fuel-types';
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

// fuel type end points tests
describe('fuel type controller tests', () => {
  // get all fuel types list
  describe('GET /fuel-types | Get all fuel type list', () => {
    it('should be return all fuel type list', async () => {
      // call to fuel types endpoint. GET
      const response = await request.get(baseURI)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .catch(err => {
          if (err) throw err;
        });
      
      expect(response.status).toBe(200);
    });
  });

  // create a fuel type. POST
  describe('POST /fuel-types | Create a fuel type', () => {
    it('should be create a fuel type', async () => {
      const fuelType = {
        fuelType: 'Test fuel type',
        addedBy: process.env.USER_ID,
      }

      // call to the fuel type endpoint. POST
      await request.post(baseURI)
        .send(fuelType)
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
              fuelType: res.body.fuelType,
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
  
  // check vehicle condition by id
  describe('GET /:id | Get a fuel type by id.', () => {
    it('should be return a fuel type by id', async () => {
      if (type) {
        // call to the fuel type by id
        const responseId = await request.get(baseURI + '/' + `${type.id}`)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch(err => {
            if (err) throw err;
          });
        
        expect(responseId).toBe(200);
        expect(responseId).toEqual({
          id: responseId.body.id,
          fuelType: responseId.body.fuelType,
          createdAt: responseId.body.createdAt,
        });
      }
    });
  });
  
  // check unique fuel type
  describe('POST /fuel-types | Check duplicate fuel type restrict', () => {
    it('should be reject or show error with same fuel type', async () => {
      const fuelType = {
        fuelType: "Test fuel type",
        addedBy: process.env.USER_ID,
      };
      
      const response = await request.post(baseURI)
        .send(fuelType)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .catch(err => {
          if (err) throw err;
        });
      
      expect(response.status).toBe(500);
    });
  });
  
  // update existing fuel type
  describe('PUT /fuel-types/:id | Update fuel type by id', () => {
    it('should be update fuel type details related to the fuel type id', async () => {
      if (type) {
        const fuelType = {
          fuelType: "Update fuel type"
        }
        
        const response = await request.put(baseURI + '/' + type.id)
          .send(fuelType)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch(err => {
            if (err) throw err;
          });
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          id: response.body.id,
          fuelType: response.body.fuelType,
          createdAt: response.body.createdAt,
        });
      }
    });
  });
  
  // delete existing fuel type details
  describe('DELETE /fuel-types/:id | Delete fuel type details by id', () => {
    it('should be delete fuel type details by the fuel type id', async () => {
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
