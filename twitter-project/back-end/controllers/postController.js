const Post = require('../models/Post');

//Get all Post
exports.getAllPosts = async (req, res, next) =>{
    try{
        //Tim toan bo bai post
        // populate: Lay id user va truy tim noi chua thong tin ve author
        // name filed want to get
        // _id is auto get, -_id to remove _id
        const posts = await Post.find({}).populate('author', 'name').select('content createdAt');
        res.status(200).json({
            status:'success',
            results: posts.length,
            data:{posts}
        })
    } catch(error){
        res.json(error);
    }
}

// Create one post
exports.createOnePost = async (req, res, next) =>{
    try{
        const {userId} = req.user;

        //...req.body Lay toan bo thong tin trong req.body
        const post = await Post.create({...req.body, author: userId});

        res.status(200).json({
            status:'success',
            data:{post}
        })
    } catch(error){
        next(error);
    }
}

// Update one post
exports.updateOnePost = async (req, res, next) =>{
    try{
        const {postId} = req.params;

        // new: true phan hoi lai bai post da update
        const post = await Post.findByIdAndUpdate(postId, {...req.body}, {new: true, runValidator: true});

        res.status(200).json({
            status:'success',
            data:{post}
        })
    } catch(error){
        next(error);
    }
}

// Delete one post
exports.deleteOnePost = async (req, res, next) =>{
    try{
        const {postId} = req.params;
        
        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            status:'success',
            massage: 'Post has been deleted'
        })
    } catch(error){
        next(error);
    }
}