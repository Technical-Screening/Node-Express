import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

// base url with vehicle option end point
const baseURI = process.env.BASE_URL + 'vehicle-make';
// auth url
const authURI = process.env.BASE_URL + 'auth/login';

// declare the token variable in a scope accessible
let token, type, user;

// get access token from login end point and store it on token
beforeAll((done) => {
  request.post(authURI).send({
    email: process.env.AUTH_USER,
    password: process.env.AUTH_PASS,
  }).end((err, response) => {
    token = response.body.token; // save the token
    done();
  });
});

// vehicle make end points tests
describe('vehicle make controller tests', () => {
  // get all vehicle make list
  describe('GET /vehicle-make | Get all vehicle make list', () => {
    it('should be return all vehicle make list', async () => {
      // call to the vehicle make endpoint. GET
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
  
  // create a vehicle make
  describe('POST /vehicle-make | create a vehicle make', () => {
    it('should be create a vehicle make', async () => {
      const vehicleMake = {
        vehicleMake: 'Test vehicle make',
        addedBy: process.env.USER_ID,
      }
      
      // call to the vehicle make endpoint. POST
      await request.post(baseURI)
        .send(vehicleMake)
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
              vehicleMake: res.body.vehicleMake,
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
  
  // check vehicle make by id
  describe('GET /:id | Get a vehicle make by id', () => {
    it('should be return vehicle make by vehicle make id', async () => {
      if (type) {
        // call to the vehicle make by id
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
          vehicleMake: responseById.body.vehicleMake,
          createdAt: responseById.body.createdAt,
        });
      }
    });
  });
  
  // check unique vehicle make
  describe('POST /vehicle-make | Check duplicate vehicle make restrict',  () => {
    it('should be reject or show error with same vehicle make', async () => {
      const vehicleMake = {
        vehicleMake: "Test vehicle make",
        addedBy: process.env.USER_ID,
      };
      
      const response = await request.post(baseURI)
        .send(vehicleMake)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .catch(err => {
          if (err) throw err;
        });
      
      expect(response.status).toBe(500);
    });
  });
  
  // update existing vehicle make
  describe('PUT /vehicle-make/:id | Update vehicle make by id', () => {
    it('should be update vehicle make details related to the vehicle make id', async () => {
      if (type) {
        const vehicleMake = {
          vehicleMake: "Update vehicle make"
        }
        
        const response = await request.put(baseURI + '/' + type.id)
          .send(vehicleMake)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch(err => {
            if (err) throw err;
          });
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          id: response.body.id,
          vehicleMake: response.body.vehicleMake,
          createdAt: response.body.createdAt,
        });
      }
    });
  });
  
  // delete existing vehicle make details
  describe('DELETE /vehicle-make/:id | Delete vehicle make details by id', () => {
    it('should be delete vehicle make details by the vehicle make id', async () => {
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