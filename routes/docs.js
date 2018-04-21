const express = require('express'),
      router = express.Router()

var doc =
  "Welcome to the OneTwo API. If you have any questions or run into a technical issue, please email me at hireme@mrjsykes.com.";

router.get("/", (req, res) => {
  res.json({ message: doc });
});


  module.exports = router;