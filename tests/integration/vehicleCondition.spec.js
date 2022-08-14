import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

// base url with vehicle option end point
const baseURI = process.env.BASE_URL + 'vehicle-conditions';
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

// vehicle conditions controller end points tests
describe('vehicle conditions controller tests', () => {
  // get all vehicle conditions list
  describe('GET /vehicle-conditions | Get all vehicle make list', () => {
    it('should be return all vehicle conditions list', async () => {
      // call to vehicle condition endpoint. GET
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
  
  // create a vehicle condition. POST
  describe('POST /vehicle-conditions | create a vehicle condition', () => {
    it('should be create a vehicle make', async () => {
      const vehicleCondition = {
        condition: 'Test vehicle condition',
        addedBy: process.env.USER_ID,
      }
      
      // call to the vehicle condition endpoint. POST
      await request.post(baseURI)
        .send(vehicleCondition)
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
              condition: res.body.condition,
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
  describe('GET /:id | Get a vehicle make by id', () => {
    it('should be return a vehicle condition by vehicle condition id', async () => {
      if (type) {
        // call to the vehicle condition by id
        const responseById = await request.get(baseURI + '/' + `${type.id}`)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch(err => {
            if (err) throw err;
          });
        
        expect(responseById.status).toBe(200);
        expect(responseById.body).toEqual({
          id: responseById.body.id,
          condition: responseById.body.condition,
          createdAt: responseById.body.createdAt,
        });
      }
    });
  });
  
  // check unique vehicle condition
  describe('POST /vehicle-conditions | Check duplicate vehicle condition make restrict', () => {
    it('should be reject or show error with same vehicle condition', async () => {
      const vehicleCondition = {
        condition: "Test vehicle condition",
        addedBy: process.env.USER_ID,
      };
      
      const response = await request.post(baseURI)
        .send(vehicleCondition)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .catch(err => {
          if (err) throw err;
        });
      
      expect(response.status).toBe(500);
    });
  });
  
  // update existing vehicle condition
  describe('PUT /vehicle-conditions/:id | Update vehicle condition by id', () => {
    it('should be update vehicle condition details related to the vehicle condition id', async () => {
      if (type) {
        const vehicleCondition = {
          condition: "Update vehicle condition"
        }
        
        const response = await request.put(baseURI + '/' + type.id)
          .send(vehicleCondition)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch(err => {
            if (err) throw err;
          });
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          id: response.body.id,
          condition: response.body.condition,
          createdAt: response.body.createdAt,
        });
      }
    });
  });
  
  // delete existing vehicle condition details
  describe('DELETE /vehicle-conditions/:id | Delete vehicle condition details by id', () => {
    it('should be delete vehicle condition details by the vehicle condition id', async () => {
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