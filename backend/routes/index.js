const express = require('express');
const accountRouter = require("./account") ;
const userRouter = require("./user");

const router = express.Router();

router.use('/user',userRouter);
router.use('/account',accountRouter);

module.exports = router;
//app/v1/user
//app/v1/transaction...