const app = require('./app');
require('dotenv').config();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const host = process.env.HOST ? process.env.HOST : '0.0.0.0';

app.listen(port, host, () => {
    console.log(`App ON-LINE on PORT: ${port}`)
})