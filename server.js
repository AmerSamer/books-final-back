const express = require('express');
// const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
// const multer = require('multer');
// const itemsModel = require('./models/Items.model').itemsModel;
// require('./models/authors.model');
// app.use(bodyParser.json());;
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
// app.use(fileUpload());

app.use('/books/store', require('./routes/users.route'));
app.use('/books/store', require('./routes/books.route'));
app.use('/books/store', require('./routes/carts.route'));
app.use('/books/store', require('./routes/favorites.route'));
///////////////////////////
// const storage = multer.diskStorage({
//     destination: function(request, file, callback){
//         callback(null, '/uploads/images');
//     },
//     filename: function(request, file, callback){
//         callback(null, Date.now() + file.originalname);
//     },
// });
// const upload = multer({
//     storage:storage,
//     limits:{
//         fieldSize:1024*1024*3
//     }
// });

///////////////////////////////
mongoose.connect(`${process.env.DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});
app.listen(process.env.PORT || 4001, () => console.log(`Listening on port ${process.env.PORT || 4001}`));
