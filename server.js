const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
// const itemsModel = require('./models/Items.model').itemsModel;
// require('./models/authors.model');
// app.use(bodyParser.json());;
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.use('/books/store', require('./routes/users.route'));
app.use('/books/store', require('./routes/books.route'));
app.use('/books/store', require('./routes/carts.route'));

mongoose.connect('mongodb://localhost/dbBooksStore', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});
app.listen(process.env.PORT || 4001, () => console.log(`Listening on port ${process.env.PORT || 4001}`));
