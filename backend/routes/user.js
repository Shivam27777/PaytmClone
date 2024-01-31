import { Router } from "express";
const zod = require('zod');
import {User} from "../db";
import JWT_SECRET from "../config";
const jwt = require('jsonwebtoken');
const userRouter = Router();
const  { authMiddleware } = require("../middleware");


const signupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    password : zod.string()
})

userRouter.post("/signup", async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if ( !success){
        return res.json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username : body.username
    })

    if(user._id){
        return res.json({
            message : "Email already taken / Incorrect inputs"
        })
    }

    await User.create(body);
    const token  = jwt.sign({
        userId : dbUser._id
    }, JWT_SECRET);
    res.json({
        message: "User created successfully",
        token : token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

userRouter.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

userRouter.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

// Learned something new here - Like Operation in mongoos 
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

export default userRouter;