const express = require('express');
const morgan = require('morgan');
const { Prohairesis } = require('prohairesis');
const bodyParser = require('body-parser');
const { response } = require('express');
const dotenv = require('dotenv')

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const mySQLString = process.env.CLEARDB_DATABASE_URL;
const database = new Prohairesis(mySQLString);

app
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())

    .post('/', async (req, res) => {
        const body = req.body;

        await database.execute(`
        INSERT INTO email (
            email_address
        ) VALUES (
            @emailAddress
        )
    `, {
            emailAddress: body.email,
        });

        res.sendFile(__dirname + '/public/formSuccess.html');
    })

    .listen(port, () => console.log('Server Listening on port ' + port));

