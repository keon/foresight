import Redis from 'ioredis';

const client = new Redis({
  host: 'localhost',
  port: 6379, // Default Redis port
});

client.on('error', (error) => {
  console.error('Redis client error:', error);
});

export default client;