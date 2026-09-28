const app = require('./src/app');
const { testSequelizeConnection } = require('./src/config/sequelize');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Backend server đang chạy tại cổng http://localhost:${PORT}/api`);
  await testSequelizeConnection();
});
