const bodyParser = require('body-parser');
const cors = require('cors');

const configureMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(cors());
};

module.exports = configureMiddleware;
