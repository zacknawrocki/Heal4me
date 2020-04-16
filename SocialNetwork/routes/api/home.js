const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @desc   Helper function for removing objects with a property of null value
function removeNullPropObjectsFromArray(arr, propName) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i][propName] === null) {
            arr.splice(i, 1);
            --i;
        }
        ++i;
    }
}

// @route  GET api/recommendation
// @desc   Get similar posts for recommendations
// @access Public
router.get('/', auth, async(req, res) => {
    try {
        let cutoff = new Date();
        cutoff.setDate(cutoff.getDate()-7);
        
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('recently_viewed.post');
        const posts = await Post.find({date: {$gt: cutoff}, user: {$ne: user.id}});
        
        let rv = user.recently_viewed;
        removeNullPropObjectsFromArray(rv, "post");
        // for (let i=0; i < rv.length; ++i) {
        //     if (rv[i].post !== null) {
        //         console.log(rv[i].post.text);
        //     }
        // }

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;