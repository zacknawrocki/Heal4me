const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');

router.get('/', auth, async(req, res) => {
    const token = req.header('x-auth-token');
    if (token) {
      try {
        createdPosts = await Post.find({user: req.user.id}, 'text');
        
        const user = await User.findById(req.user.id);
        
        res.json({
          grade: user.psych_score
        });
        
        const path = require('path');
        const {spawn} = require('child_process');
        const subprocess = spawn('python',
          [path.join(__dirname, '../../recommender/use_classifier.py'),
            JSON.stringify(createdPosts)]);
        
        let result = "";
        let grade = 0.0;
        subprocess.stdout.on('data', (data) => {
          result += data.toString();
        });
        subprocess.stderr.on('data', (data) => {
          console.log(`error:\n${data}\n`);
        });
        subprocess.stderr.on('close', async () => {
          console.log(result);
          grade = parseFloat(result * 100.0);
          
          user.psych_score = grade;
          console.log("SCORE:" + user.psych_score);
          await user.save();
        });

        
      } catch (err) {
        console.error(err.message);
        res.status(500).send({
          msg: err.message,
          code: 500
        });
      }
    }
  }
);

module.exports = router;