import { Router } from "express";
import accountRouter from "./account";
const userRouter = require("./user");

const router = Router();

router.use('/user',userRouter);
router.use('/account',accountRouter);

export default router ;
//app/v1/user
//app/v1/transaction...