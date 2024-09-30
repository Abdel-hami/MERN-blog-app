const express = require("express");
const cors = require("cors");
require("./db/index")
const app = express(); 
app.use(cors());
app.use(express.json())

app.use("/api",(req,res)=>{
    res.send("hello api")
})
app.listen(5000,()=> console.log("am listening in port 5000"))