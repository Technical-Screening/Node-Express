import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

// base url with fuel type end point
const baseURI = process.env.BASE_URL + 'users';
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

// users controller end points tests
describe('users controller tests', () => {
  // get all users list
  describe('GET /users | Get all users list', () => {
    it('should be return all users list', async () => {
      // call to users endpoint. GET
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
  
  // create a user endpoint. POST
  describe('POST /users | Create a user detail', () => {
    it('should be create a user', async () => {
      const user = {
        email: 'test123@test.com',
        name: 'test name',
        password: '123456',
        bio: 'test description'
      };
      
      // call to the user endpoint. POST
      await request.post(baseURI)
        .send(user)
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
              email: res.body.email,
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
  
  // check user details by id
  describe('GET /:id | Get a user detail by id', () => {
    it('should be return a user by id', async () => {
      if (type) {
        // call to the user by id
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
          email: responseId.body.email,
          name: responseId.body.name,
          createdAt: responseId.body.createdAt,
        });
      }
    });
  });
  
  // check unique user
  describe('GET /:id | Get a user details by id', () => {
    it('should be reject or show error with same user email', async () => {
      const user = {
        email: 'test123@test.com',
        name: 'test name',
        password: '123456',
        bio: 'test description'
      };
      
      const response = await request.post(baseURI)
        .send(user)
        .set('x-access-token', `${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .catch(err => {
          if (err) throw err;
        });
      
      expect(response.status).toBe(500);
    });
  });
  
  // update existing user detail
  describe('PUT /users/:id | Update user details by id', () => {
    it('should be update user details related by user id', async () => {
      if (type) {
        const user = {
          email: 'test123@test.com',
          name: 'Update test name',
          password: '123456',
          bio: 'test description'
        };
        
        const response = await request.put(baseURI + '/' + type.id)
          .send(user)
          .set('x-access-token', `${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .catch(err => {
            if (err) throw err;
          });
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          id: response.body.id,
          email: response.body.email,
          name: response.body.name,
          createdAt: response.body.createdAt,
        });
      }
    });
  });
  
  // delete existing user details
  describe('DELETE /users/:id | Delete user details by id', () => {
    it('should be delete user details by the id', async () => {
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