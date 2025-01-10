const express = require('express');
const app = express();

const port = process.env.port || 4000;
app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/status', (req, res) => {
    const status = {
        "Status": "Running"
    }
    res.send(status);
});