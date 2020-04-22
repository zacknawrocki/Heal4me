
//https://www.npmjs.com/package/bing-image-search-async-iterator 这个是package的网址，有很多选项
// npm install --save bing-image-search-async-iterator
const search = require('bing-image-search-async-iterator');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// const User = require('../../models/User');

// @ route Get api/posts/my
// @ get my posts

router.get('/', auth, async(req, res) => {
  console.log(req.query);
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
  
    // const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    // const out = [];
    const num = 4;
    // const allHobbies = profiles.reduce((pre, cur)=>{
    //   return pre.concat(cur.hobbies || [])
    // }, [])
    // while(out.length < num){
    //   const temp = (Math.random()*allHobbies.length) >> 0;
    //   out.push(allHobbies[temp]);
    //   allHobbies.splice(temp,1)
    // }
    // console.error(out);
    const hobbies = profile.hobbies || [];
    let results = []
    const hobbie = hobbies[Math.floor((Math.random()*hobbies.length))]
    // const keyword = allHobbies.join(' ')
    const responses = search({
      key:'acfbbc19fbfd4c58810040ea1cfe8e99',
      query: hobbie,
      amount: 12,
      width: 200,
      aspect: 'Wide'
    })
    for await (const response of responses) {
      for (const result of response.value) {
        results.push(result)
      }
    }
    console.log(results);
    // const posts = await Post.find().sort({ date: -1 });
    res.json(results);
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/images/grade', auth, async(req, res) => {
    console.log(req.query);
    try {
      
      res.json({
        grade: 80
      });
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send({
        msg: err.message,
        code: 500
      });
    }
  }
);

module.exports = router;
