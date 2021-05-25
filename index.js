const express = require('express');
const morgan = require('morgan');
const { Prohairesis } = require('prohairesis');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express();
const port = process.env.PORT || 8080;

app
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())

    .post('/api/user', (req,res)=> {
        res.json(req.body);
    })

    .listen(port, () => console.log('Server Listening on port ' + port));

