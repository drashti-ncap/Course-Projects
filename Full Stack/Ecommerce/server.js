require('dotenv').config();
const app = require('./src/app');
const connectDatabase = require('./src/config/database');
const env = require('./src/config/env');

const startServer = async () => {
  await connectDatabase();

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
