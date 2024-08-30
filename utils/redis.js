// utils/redis.js
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Log any errors to the console
    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });
  }

  // Check if the Redis connection is alive
  isAlive() {
    return this.client.connected;
  }

  // Get a value by key from Redis
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
          return; // Ensure the function exits after reject
        }
        resolve(value);
      });
    });
  }

  // Set a value in Redis with an expiration time
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err) => {
        if (err) {
          reject(err);
          return; // Ensure the function exits after reject
        }
        resolve(true);
      });
    });
  }

  // Delete a value by key from Redis
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          reject(err);
          return; // Ensure the function exits after reject
        }
        resolve(true);
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
