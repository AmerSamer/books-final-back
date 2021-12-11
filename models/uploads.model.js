const mongoose = require('mongoose');

const uploadsSchema = new mongoose.Schema({
    img: {
        type: String,
        required: false,
    },
    
});
const Upload = mongoose.model('uploads', uploadsSchema);

module.exports = {
    Upload
}

