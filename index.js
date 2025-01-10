require('dotenv').config();
const { CosmosClient } = require('@azure/cosmos');
const express = require('express');
const app = express();
app.use(express.json());
var hashingFuncs = require('./hash');
const port = process.env.port || 4000;
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_ENDPOINT;
//const cosmosClient = new CosmosClient({endpoint, key});

app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
});

app.get('/status', (req, res) => {
    const status = {
        "Status": "Running"
    }
    res.send(status);
});

app.post('/url', (req, res) => {
    if (req.body.url) {
        const hashedData = hashingFuncs.basicHash(req.body.url);
        const shortURL = {
            "key": hashedData,
            "longUrl": req.body.url,
            "shortUrl": `http://localhost/${hashedData}`
        }
        res.send(shortURL);
    } else {
        const error = 'Missing parameter - url';
        res.status(400).json({ error });
    }
});