const express=require("express")
const connection=require("./Config/db")
const userRouter = require("./Route/user.route")
const fileRouter=require("./Route/file.route")
const cors=require("cors")
const app=express()
app.use(express.json())

app.use(cors());


app.get("/test",(req,res)=>{
    res.send("hello, its working")
    
})

app.use("/user",userRouter)

app.use("/files",fileRouter)




app.listen(8080,async()=>{
    try {
        await connection;
        console.log("Connected to server");
      } catch (err) {
        console.log("Error in connection", err);
      }
    console.log("listing on port 8080")
})