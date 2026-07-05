import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import AuthRouter from "./router/AuthRouter.js"
import ReviewRouter from "./router/ReviewRouter.js"
import LeadRouter from "./router/LeadRouter.js"
import connectdata from "./config/db.js"

dotenv.config()

const app = express()

connectdata()

const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.use("/api/user", AuthRouter)
app.use("/api/reviews", ReviewRouter)
app.use("/api/leads", LeadRouter)

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})