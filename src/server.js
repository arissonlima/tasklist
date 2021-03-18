// import app from './app';
const app = require('./app');

require('dotenv/config');

app.listen(process.env.PORT || 3334);
