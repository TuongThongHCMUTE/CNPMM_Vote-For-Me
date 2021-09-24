const express = require('express');

const {getAllPosts, createOnePost, updateOnePost, deleteOnePost} = require('../controllers/postController.js');

const {verifyToken} = require('../middlewares/verifyToken');

const Router = express.Router();

//Lay toan bo
// Befor create post need to verify token
Router.route('/').get(getAllPosts).post(verifyToken, createOnePost);

//Truyen vao id
Router.route('/:postId').put(verifyToken, updateOnePost).delete(verifyToken, deleteOnePost);

module.exports = Router;