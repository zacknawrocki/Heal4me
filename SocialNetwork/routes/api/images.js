
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
  const offset = req.query.offset
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
  
    let hobbies = []
    if (profile && profile.hobbies) {
      hobbies = profile.hobbies
    } else {
      hobbies = ['love', 'life']
      // const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      // const profile1 = profiles[Math.floor((Math.random()*profiles.length))]
    }
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
    console.log(profile);
    // const hobbies = profile.hobbies || [];
    let results = []
    const hobbie = hobbies[Math.floor((Math.random()*hobbies.length))]
    // const keyword = allHobbies.join(' ')
    const responses = search({
      key:'acfbbc19fbfd4c58810040ea1cfe8e99',
      query: hobbie,
      amount: 20,
      width: 300,
      aspect: 'Wide',
      nextOffset: offset+15,
      offset,
    })
    for await (const response of responses) {
      for (const result of response.value) {
        results.push(result)
      }
    }
    // const posts = await Post.find().sort({ date: -1 });
    res.json(results);
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
