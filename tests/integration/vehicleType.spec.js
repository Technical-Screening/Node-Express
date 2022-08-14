import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

// base url with vehicle type end point
const baseURI = process.env.BASE_URL + 'vehicle-types';
// auth url
const authURI = process.env.BASE_URL + 'auth/login';

// declare the token variable in a scope accessible 
let token, type, user;

// get access token from login end point and store it on token
beforeAll((done) => {
  // get token
  request.post(authURI).send({
    email: process.env.AUTH_USER,
    password: process.env.AUTH_PASS,
  }).end((err, response) => {
    token = response.body.token; // save the token
    done();
  });
});

// vehicle types end points tests.
describe('vehicle types controller tests', () => {
  // get all vehicle types list
  describe('GET /vehicle-types | Get all vehicle types list', () => {
    it('should be return all vehicle types list', async () => {
      // call to the vehicle types endpoint. GET
      const response = await request.get(baseURI)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .catch((err, res) => {
          if (err) throw err;
        });
      
      expect(response.status).toBe(200);
    });
  });
  
  // create a vehicle type
  describe('POST /vehicle-types | Create a vehicle type', () => {
    it('should be create a vehicle type', async () => {
      const vehicleType = {
        vehicleType: "Test Vehicle Type",
        addedBy: process.env.USER_ID,
      };
      
      // call to the vehicle types endpoint. POST
      const response = await request.post(baseURI)
        .send(vehicleType)
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
              vehicleType: res.body.vehicleType,
              createdAt: res.body.createdAt
            });
          } else {
            expect(res.status).toBe(500);
          }
        })
        .catch((err, res) => {
          if (err) throw err;
        });
    });
  });
  
  // check vehicle type by id
  describe('GET /:id | Get a vehicle type by id', () => {
    it('should be return vehicle type for the id', async () => {
      if (type) {
        // call to the vehicle type by id
        const responseById = await request.get(baseURI + '/' + `${type.id}`)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch((err, res) => {
            if (err) throw err;
          });

        // check vehicle type by id response
        expect(responseById.status).toBe(200);
        expect(responseById.body).toEqual({
          id: responseById.body.id,
          vehicleType: responseById.body.vehicleType,
          createdAt: responseById.body.createdAt
        });
      }
    });
  });
  
  // check unique vehicle type name
  describe('POST /vehicle-types | Check duplicate vehicle type restrict', () => {
    it('should be reject or show error with same vehicle name', async () => {
      const vehicleType = {
        vehicleType: "Test Vehicle Type",
        addedBy: process.env.USER_ID,
      };
      
      const response = await request.post(baseURI)
        .send(vehicleType)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .catch((err, res) => {
          if (err) throw err;
        });
      
      expect(response.status).toBe(500);
    });
  });
  
  // update existing vehicle type value
  describe('PUT /vehicle-types/:id | Update vehicle type details', () => {
    it('should be update vehicle type details related to the vehicle type id', async () => {
      if (type) {
        const vehicleType = {
          vehicleType: "Updated vehicle type",
        }
        
        const response = await request.put(baseURI + '/' + type.id)
          .send(vehicleType)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch((err) => {
            if (err) throw err;
          });

        expect(response.body).toEqual({
          id: response.body.id,
          vehicleType: vehicleType.vehicleType,
          createdAt: response.body.createdAt,
        });
        expect(response.status).toBe(200);
      }
    });
  });
  
  // delete existing vehicle type value
  describe('DELETE /vehicle-types/:id | Delete vehicle type detail by id', () => {
    it('should be delete vehicle type details related to the vehicle type id', async () => {
      if (type) {
        await request.delete(baseURI + '/' + type.id)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .send()
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(res.status).toBe(200);
          })
          .catch((err) => {
            if (err) throw err;
          });
      }
    });
  });
});