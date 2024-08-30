const crypto = require('crypto');
const dbClient = require('../utils/db');

class UserController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const existingUser = await dbClient.db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already Exist' });
    }

    // hashing password with sh1
    const sha1Password = crypto.createHash('sha1').update(password).digest('hex');

    // New user Information insert into database
    const newUser = await dbClient.db.collection('users').insertOne({
      email,
      password: sha1Password,
    });

    return res.status(201).json({ id: newUser.insertedId, email });
  }
}
module.exports = UserController;
