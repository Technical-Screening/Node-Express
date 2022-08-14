import { getMockRes } from '@jest-mock/express';
import Jwt from '../../src/app/pkg/jwt';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import supertest from 'supertest';
import app from '../../src/app';

dotenv.config();

const request = supertest(app);
// auth url
const authURI = process.env.BASE_URL + 'auth/login';

// define token variable
let token;

beforeAll((done) => {
  request.post(authURI).send({
    email: process.env.AUTH_USER,
    password: process.env.AUTH_PASS,
  }).end((err, response) => {
    token = response.body.token;
    done();
  });
});

// jwt token functionality testing
describe('jwt token functionality testing', () => {

  // create token testing
  describe('create a token testing', () => {
    it('should be create a jwt token', async () => {
      // payload
      const payload = {
        email: faker.internet.email(),
        name: faker.name.firstName(),
      }
  
      // get returned token value
      const token = await Jwt.createToken(payload);

      expect(token).toEqual(expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/));
    });
  });

  // compare old password and new password testing
  describe('compare old password and new password', () => {
    it('should be match with old password and received password hashed values', async () => {
        // set required values
        const textPassword = process.env.AUTH_PASS;
        const hashedPassword = process.env.HASH_PASS;
        const response = getMockRes();

        // compare plain text password and hashed password
        const comparePassword = await Jwt.comparePasswordAndOldPassword(textPassword, hashedPassword, response);
        
        // return value should be true
        expect(comparePassword).toBeTruthy();
    });
  });

  // converted to a hashed password testing
  describe('convert to a hashed password', () => {
    it('should be return a hashed password', async () => {
      const password = process.env.AUTH_PASS;
      const response = getMockRes();

      const hashedPassword = await Jwt.convertToHashedPassword(password, response);

      expect(hashedPassword).toEqual(expect.stringMatching(/^\$2[ayb]\$.{56}$/));
    });
  });

  // verify jwt token testing
  describe('verify jwt token', () => {
    it('should be return a user id', async () => {
      const userId = process.env.USER_ID;

      // verify token function response
      const decodedToken = await Jwt.verifyToken(token);

      expect(decodedToken).toEqual({ userId: userId });
    });
  });

});

