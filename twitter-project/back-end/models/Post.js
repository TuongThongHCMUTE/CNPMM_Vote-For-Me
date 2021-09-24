const mongoose = require('mongoose');

//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const postSchema = new mongoose.Schema({
    content: {type: String, required: [true, 'Post must have content'], trim: true},
    author: {
        //Chi lay userId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

//Tao model dua vao co che postSchema
const Post = mongoose.model('Post', postSchema)

module.exports = Post; 