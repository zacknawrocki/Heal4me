const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./scratch');

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

// @desc   Helper function for determining if all ids in both arrays match
function check_if_ids_match(arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false;
    }
    let i = 0;
    while (i < arr1.length) {
        if (arr1[i]["_id"] != arr2[i]["_id"]) {
            return false;
        }
        ++i;
    }
    return true;
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
      if (!user) {
        res.status(500)
      }
        let rv = user.recently_viewed;
        removeNullPropObjectsFromArray(rv, 'post');
        
        const rv_trimmed = rv.map(item => {
            return {
                _id: item.post.id,
                text: item.post.text
            }
        });
        
        // Check it's safe to access the cache
        const cache_exists = localStorage.getItem("rv_cached") != null;

        // Declare cached list of recently viewed posts, ids_match boolean variable
        let rv_cached = null;
        let ids_match = null;

        if (cache_exists) {
            // Retrieve cached list of recently viewed posts and parse into JSON
            rv_cached = JSON.parse(localStorage.getItem("rv_cached"));

            // Check if the recommender script should be run, based on whether the list of
            // recently viewed posts has changed since the dashboard was last accessed
            ids_match = check_if_ids_match(rv_trimmed, rv_cached);
        }

        // If the list of recently viewed posts is unchanged, send the cached list
        // of recommended posts that was calculated in a previous dashboard visit
        if (cache_exists && ids_match) {
            res.json(JSON.parse(localStorage.getItem("rec_cached")));
            return 0;
        }
        
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
            [path.join(__dirname, '../../recommender/post_recommender.py'),
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
            const mongoose = require("mongoose");
 
            post_ids = JSON.parse(result);
            
            // Convert strings to ObjectIds
            for (let i = 0; i < post_ids.length; ++i) {
                post_ids[i] = mongoose.Types.ObjectId(post_ids[i]._id);
            }
            
            // Get the documents and send them
            post_docs = Post.find({'_id': { $in: post_ids }},
            function(err, docs) {
                // Update cached copies of the recently viewed and recommended lists
                localStorage.setItem("rv_cached", JSON.stringify(rv_trimmed));
                localStorage.setItem("rec_cached", JSON.stringify(docs));
                res.json(docs);
            });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
