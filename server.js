const express = require('express');
require('dotenv').config();
require('./config/db');
const routes = require('./api/v1/src/routes')
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use('/v1', routes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})