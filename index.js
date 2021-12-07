const mongoose = require('mongoose')
const app = require('./app.js')
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URI

mongoose.connect(MONGO_URL).then(() => {
    console.log('database connected')
    app.listen(PORT, () => { console.log('listening on', PORT) });
})
