const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const mongoose = require('mongoose');

const config = require('config');
const anonID = config.get('anonID');

// @desc   Helper function for finding an object with a property containing the given value
function findPropertyInArrayOfObjects(arr, propName, value) {
    let i = 0;
    while (i < arr.length && arr[i][propName] != value) ++i;
    return i < arr.length ? i : -1;
}

// @ route Get api/posts/my
// @ get my posts

router.get('/my', [auth, [
    check('text', 'Text is required').not().isEmpty()
]],
    async(req, res) => {
    const data = await Post.find({user: req.user.id})
    res.json(data)
    }
)

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post('/', auth, [
    check('text', 'Text is required').not().isEmpty()
],
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        const userid = req.user && req.user.id ? req.user.id : anonID;
        const user = await User.findById(userid).select('-password');
      let option = {
        text: req.body.text,
        // name: 'anonymous',
        // avatar: '',
        // user:
      }
      if (user) {
        option = Object.assign({}, option, {
          name: user.name,
          avatar: user.avatar,
          user: userid
        })
      }
        const newPost = new Post(option);
        
        const post = await newPost.save();

        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
);

// @route  GET api/posts
// @desc   Get all posts
// @access Public
router.get('/', auth, async(req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route  GET api/posts/:id
// @desc   Get post by ID
// @access Private
router.get('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: 'Post not found'});
        }

        const userid = req.user !== undefined ? req.user.id : anonID;
        const user = await User.findById(userid).select('-password');

        if (userid !== anonID) {
            let postPos = findPropertyInArrayOfObjects(user.recently_viewed, "post", post.id);
            
            if (postPos >= 0) {
                user.recently_viewed.splice(postPos, 1);
                user.recently_viewed.unshift({ post: post.id });
            } else {
                user.recently_viewed.unshift({ post: post.id });
            }
    
            if (user.recently_viewed.length > 10) {
                user.recently_viewed.pop();
            }

            await user.save();
        }

        res.json(post);
        
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found'});
        }
        res.status(500).send('Server error');
}
}
);

// @route  DELETE api/posts/:id
// @desc   Delete a post
// @access Private
router.delete('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found'});
        }
        
        // Check user
        if(post.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'});
        }
 
        await post.remove();
        res.json({ msg: 'Post removed'});
      
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found'});
        }
        res.status(500).send('Server error');
}
}
);

// @route  PUT api/posts/like/:id
// @desc   Like a post
// @access Private
router.put('/like/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        // Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked'});
        }

        post.likes.unshift({ user: req.user.id});

        await post.save();

        res.json(post.likes);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
}
}
);

// @route  PUT api/posts/unlike/:id
// @desc   Unlike a post
// @access Private
router.put('/unlike/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        
        // Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked'});
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();
        res.json(post.likes);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
}
}
);

// @route  POST api/posts/comments/:id
// @desc   Comment on a post
// @access Private
router.post('/comment/:id', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]],
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    try {
        const userid = req.user !== undefined ? req.user.id : anonID;
        const user = await User.findById(userid).select('-password');

        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: userid
        };

        post.comments.unshift(newComment);
        
        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
);

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Delete a comment
// @access Private
router.delete('/comment/:id/:comment_id', auth,
async(req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        // Make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: 'Comment does not exist'});
        }

        // Check user
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'});
        }

        // Get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
);
module.exports = router;
