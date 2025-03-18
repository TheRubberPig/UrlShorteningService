const { AceBase } = require('acebase');
const express = require('express');
const app = express();
app.use(express.json());
var hashingFuncs = require('./hash');
const port = process.env.port || 4000;
const db = new AceBase('urlDb');

app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
});

app.get('/status', (req, res) => {
    const status = {
        "Status": "Running"
    }
    res.send(status);
});

app.post('/url', async (req, res) => {
    if (req.body.url) {
        const hashedData = hashingFuncs.basicHash(req.body.url);
        const shortURL = {
            "key": hashedData,
            "longUrl": req.body.url,
            "shortUrl": `http://localhost/${hashedData}`
        }

        const snap = await db.ref(`URLs/${hashedData}`).get()
        if (snap.exists()) {
            res.send(shortURL);
        } else {
            const ref = db.ref(`URLs/${hashedData}`).set({
                "url": req.body.url,
            });
            res.send(shortURL);
        }
    } else {
        const error = 'Missing parameter - url';
        res.status(400).json({ error });
    }
});

app.get('/shutdown', (req, res) => {
    res.status(200);
    res.send();
    db.close();
    process.exit();
})

app.get('/url/:key', async (req, res) => {
    const snapshot = await db.ref(`URLs/${req.params.key}`).get();
    var value = snapshot.val();

    if (value) {
        res.redirect(value.url);
    } else {
        const error = 'Invalid URL Key';
        res.status(404).json({ error });
    }
});

app.delete('/url/:key', async (req, res) => {
    const snapshot = await db.ref(`URLs/${req.params.key}`).get();
    var value = snapshot.val();
    if (value) {
        await db.ref(`URLs/${req.params.key}`).remove().then(() => {
            const msg = {
                "Message": "URL removed successfully!"
            }
            res.send(msg);
        })
    } else {
        const error = 'Invalid URL Key';
        res.status(404).json({ error });
    }
});