const express = require('express');

const router = express.Router();

//api/posts/test
router.get('/test', (req, res) => res.json({
  msg: "posts work"
}));

module.exports = router;