const fs = require('fs');
var express = require('express');

const { retrieveData } = require('./src/utils/fetch');
const { writeFile } = require('./src/utils/files');
require('dotenv').config();
var app = express();
//var path = require('path');

//app.use(express.static(__dirname)); // Current directory is root
app.use('/media', express.static(__dirname + '/assets'));

app.use('/update-data', async (req, res) => {
    console.log("update data")

    try {
        await retrieveDataMeta();
        res.send('done!');
    } catch (e) {
        console.error(e);
        res.send('Error!')
    }
});

const retrieveDataMeta = async () => {
    let url = process.env.url_meta;

    try {
        let data = await retrieveData(url);
        if (data && data.data) {
            writeFile(data.data);
            console.log('update success!')
        } else {
            console.log('data not found')
        }
    } catch (e) {
        console.error(e);
    }
}

app.use('/healthz', (req, res) => {
    res.send('healthz');
});

app.use('/wakeup', (req, res) => {
    const meta = require('./src/login');
    meta.login();
});

app.use('/login', (req, res) => {
    app._router
    res.send('login success!');
});

app.use('/', (req, res) => {
    res.send('hello world');
});
//app.use(express.static('/assets'));

app.listen(80);
console.log('Listening on port 80');

// app = app.listen(80, function () {
//     console.log('Listening :)');
//     app.close(function () {
//         console.info("Server closed. Restarting.");
//         var server = express();
//         //server.get("/", (req, res) => testResponse(req, res));
//         server.listen(80);
//         console.info("Server is listening to port 80.");
//     });
// });

(async () => {
    const meta = require('./src/login');
    meta.login();
})();