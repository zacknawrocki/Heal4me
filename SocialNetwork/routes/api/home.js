const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route  GET api/recommendation
// @desc   Get similar posts for recommendations
// @access Public
router.get('/', auth, async(req, res) => {
    try {
        let cutoff = new Date();
        cutoff.setDate(cutoff.getDate()-7);
        
        // todo: filter by posts not created by user
        const user = await User.findById(req.user.id).populate('recently_viewed');
        const posts = await Post.find({date: {$gt: cutoff}, user: {$ne: user.id}});
        console.log(user);

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;