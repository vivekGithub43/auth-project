const express = require('express');
const { identifier } = require('../middlewares/identification');
const { getPosts, createPost, singlePost, updatePost, deletePost, myPosts } = require('../controllers/postsController');
const router = express.Router();
router.get('/all-posts',getPosts);
router.get('/single-post',singlePost);
router.post('/create-post',identifier,createPost);
router.put('/update-post',identifier,updatePost);
router.delete('/delete-post',identifier,deletePost);
router.get('/my-posts', identifier, myPosts);
module.exports = router;

