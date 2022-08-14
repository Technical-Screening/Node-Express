import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

// base url with vehicle option end point
const baseURI = process.env.BASE_URL + 'vehicle-options';
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

// vehicle option end points tests
describe('vehicle options controller tests', () => {
  // get all vehicle options list
  describe('GET /vehicle-options | Get all vehicle options list', () => {
    it('should be return all vehicle options list', async () => {
      // call to the vehicle options endpoint. GET
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
  
  // create a vehicle option
  describe('POST /vehicle-options | create a vehicle option', () => {
    it('should be create a vehicle option', async () => {
      const vehicleOption = {
        vehicleOption: 'Test vehicle option',
        addedBy: process.env.USER_ID,
      };
      
      // call to the vehicle option endpoint. POST
      const response = await request.post(baseURI)
        .send(vehicleOption)
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
              vehicleOption: res.body.vehicleOption,
              createdAt: res.body.createdAt,
            });
          } else {
            expect(res.status).toBe(500);
          }
        })
        .catch((err) => {
          if (err) throw err;
        });
    });
  });
  
  // check vehicle option by id
  describe('GET /:id | Get a vehicle option by id', () => {
    it('should be return vehicle option for the id', async () => {
      if (type) {
        // call to the vehicle option by id
        const responseById = await request.get(baseURI + '/' + `${type.id}`)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch((err, res) => {
            if (err) throw err;
          });

        // check vehicle option by id response
        expect(responseById.status).toBe(200);
        expect(responseById.body).toEqual({
          id: responseById.body.id,
          vehicleOption: responseById.body.vehicleOption,
          createdAt: responseById.body.createdAt
        });
      }
    });
  });
  
  // check unique vehicle option name
  describe('POST /vehicle-options | Check duplicate vehicle option name restrict', () => {
    it('should be reject or show error with same vehicle option name', async () => {
      const vehicleOption = {
        vehicleOption: "Test vehicle option",
        addedBy: process.env.USER_ID,
      };

      const response = await request.post(baseURI)
        .send(vehicleOption)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .catch((err, res) => {
          if (err) throw err;
        });

      expect(response.status).toBe(500);
    });
  });
  
  // update existing vehicle option
  describe('PUT /vehicle-options/:id | update vehicle option by id', () => {
    it('should be update vehicle option details related to the vehicle type id', async () => {
      if (type) {
        const vehicleOption = {
          vehicleOption: "Update vehicle option"
        }

        const response = await request.put(baseURI + '/' + type.id)
          .send(vehicleOption)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch((err) => {
            if (err) throw err;
          });
         
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          id: response.body.id,
          vehicleOption: vehicleOption.vehicleOption,
          createdAt: response.body.createdAt,
        });
      }
    });
  });
  
  // delete existing vehicle option value
  describe('DELETE /vehicle-options/:id | Delete vehicle option detail by id', () => {
    it('should be delete vehicle option details related to the vehicle option id', async () => {
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