const express = require('express');
const mongoose = require('mongoose');
const configureRoutes = require('./routes/taskRoutes');
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(bodyParser.json());
const mongoURI = 'mongodb+srv://tkyskii2004:q3que54sucxcEYYA@tkyskii2004.ow08837.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(cors());

app.use('/', taskRoutes)
app.use('/', userRoutes);
// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

