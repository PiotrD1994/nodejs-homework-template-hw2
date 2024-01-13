import app from "./app.js"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const {DB_HOST, PORT} = process.env


app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

mongoose.connect(DB_HOST).then(() =>{app.listen(PORT, () => {
  console.log("Database connection successfl")
})
}).catch((error) => {
  console.log(error.message)
  process.exit(1)
})