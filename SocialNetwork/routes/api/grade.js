const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/', auth, async(req, res) => {
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