import newmodaldata from "../modal/Authmodal.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const registerdata =  async (req,res) =>{
    try {
        
        const {username,useremail,userpassword} = req.body

        const findemail = await newmodaldata.findOne({useremail})

        if(findemail){
            res.status(400).json({msg:"email already exit"})
            return
        }

        const hashpassword = await bcrypt.hash(userpassword,10)

        const datas = await newmodaldata.create({username,useremail,userpassword:hashpassword})

        res.status(201).json({msg:"register sucessfully",data:datas})

    } catch (error) {
        console.log(error)
        res.status(400).json({msg:"something error"})
    }
}

export const logindata =  async (req,res) =>{
    try {
        
        const {useremail,userpassword} = req.body

        const findemail = await newmodaldata.findOne({useremail})

       if(!findemail){
             res.status(400).json({msg:"enter correct email"})
             return
       }

      const isMatch = await bcrypt.compare(userpassword, findemail.userpassword)

        if (!isMatch) {
            return res.status(400).json({ msg: "enter correct password" })
        }

       const jwtToken = jwt.sign({id:findemail._id,email:findemail.useremail}, process.env.JWT_SECURE , {expiresIn:'1h'})
      
       if(!jwtToken){

        return res.status(404).json({msg:"Problem With JWt"})

        }

    res.status(200).json({
      token: jwtToken,
      username: findemail.username,
      useremail: findemail.useremail,
    })

    } catch (error) {
        console.log(error)
        res.status(400).json({msg:"something error occured"})
    }
}