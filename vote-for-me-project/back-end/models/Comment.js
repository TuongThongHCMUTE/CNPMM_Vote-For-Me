const mongoose = require('mongoose');

//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const cmtSchema = new mongoose.Schema({
    content: {type: String, required: [true, 'Comment must have content'], trim: true},
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    author: {
        //Chi lay userId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

//Tao model dua vao co che cmtSchema
const Comment = mongoose.model('Comment', cmtSchema)

module.exports = Comment; 