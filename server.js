const express = require('express');
// const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const cors = require('cors');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');

// const multer = require('multer');
// const upload = multer({
//     dest: 'images'
// })
// app.post('/upload', upload.single('upload'), (req, res)=>{
//     res.send()
// })
app.use(fileUpload());

// const itemsModel = require('./models/Items.model').itemsModel;
// require('./models/authors.model');
// app.use(bodyParser.json());;
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.use('/books/store', require('./routes/users.route'));
app.use('/books/store', require('./routes/books.route'));
app.use('/books/store', require('./routes/carts.route'));
app.use('/books/store', require('./routes/favorites.route'));
app.use('/books/store', require('./routes/notifications.route'));
app.post('/upload', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
  
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  });
  
mongoose.connect(`${process.env.DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});
app.listen(process.env.PORT || 4001, () => console.log(`Listening on port ${process.env.PORT || 4001}`));
