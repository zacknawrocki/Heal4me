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
// @desc   Helper function for determining if an object exists in an array
function objectIdExistsInArray(arr, id) {
    let i = 0;
    while (i < arr.length && arr[i]['_id'] != id) ++i;
    return i < arr.length;
}

// @route  GET api/recommendation
// @desc   Get similar posts for recommendations
// @access Public
router.get('/', auth, async(req, res) => {
    try {
        // Retrieve 10 most recently viewed posts
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('recently_viewed.post');
        
        let rv = user.recently_viewed;
        removeNullPropObjectsFromArray(rv, 'post');
        
        const rv_trimmed = rv.map(item => {
            return {
                _id: item.post.id,
                text: item.post.text
            }
        });
        
        // Retrieve all posts published within the last 7 days
        let cutoff = new Date();
        cutoff.setDate(cutoff.getDate()-7);

        // Filter by date and don't include posts published by the current user
        // Additionally, only select the 'text' column
        const posts = await Post.find({date: {$gt: cutoff}, 
            user: {$ne: user.id}}, 'text');

        // Only consider recommending posts not recently viewed
        posts_not_in_rv = posts.filter(post => !objectIdExistsInArray(rv_trimmed, post._id));
            
        // For testing purposes
        // console.log('Recently viewed posts: ' + '\n' +  JSON.stringify(rv_trimmed) + '\n');
        // console.log('All posts (within 7 days): ' + '\n' + JSON.stringify(posts) + '\n');
        // console.log('All posts (within 7 days + not recently viewed)' + '\n' + JSON.stringify(posts_not_in_rv)+ '\n');

        // Communicate with recommender script
        const path = require('path');
        const {spawn} = require('child_process');
        const subprocess = spawn('python', 
            [path.join(__dirname, '../../recommender/recommender.py'),
                JSON.stringify(rv_trimmed),
                JSON.stringify(posts_not_in_rv)]);

        let result = "";
        subprocess.stdout.on('data', (data) => {
            result += data.toString();
        });
        subprocess.stderr.on('data', (data) => {
            console.log(`error:\n${data}\n`);
        });
        subprocess.stderr.on('close', () => {
            res.json(result);
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;