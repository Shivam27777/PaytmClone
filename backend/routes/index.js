import { Router } from "express";
const userRouter = require("./user");

const router = Router();

router.use("/user",userRouter);

export default router ;
//app/v1/user
//app/v1/transaction...