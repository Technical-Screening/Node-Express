import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class Jwt {
  /**
   * create jwt token using payload
   * @param {{name, email}} payload
   * @returns {Token}
   */
  async createToken(payload) {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(payload, process.env.JWT_KEY, { expiresIn: '2h' }, (err, encoded) => {
        if (err === null && encoded !== undefined) {
          resolve(encoded);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * create hashed password using plain text password
   * @param {String} password
   * @param {Response} res
   * @returns hashedPassword
   */
  async convertToHashedPassword(password, res) {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }
  }

  /**
   * compare new password and old password
   * @param {String} password
   * @param {String} oldPassword
   * @param {Response} res
   * @returns {Boolean}
   */
  async comparePasswordAndOldPassword(password, oldPassword, res) {
    try {
      const match = await bcrypt.compare(password, oldPassword);
      return !!match;
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }
  }

  /**
   * verify jwt token
   * @param {String} token
   * @param {Response} res
   */
  async verifyToken(bearerToken) {
    return new Promise((resolve, reject) => {
      const token = bearerToken.replace('Bearer ', '');
      jsonwebtoken.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err === null && decoded !== undefined) {
          resolve({ userId: decoded.userId });
        } else {
          reject(err);
        }
      });
    });
  }
}

export default new Jwt();
