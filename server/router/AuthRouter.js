import express from "express"
import { registerdata,logindata } from "../controller/Authcontrol.js"



const router = express.Router()

router.post('/login',logindata)

router.post('/register',registerdata)

//http://localhost:5000/api/user/register


//http://localhost:5000/api/user/login


export default router