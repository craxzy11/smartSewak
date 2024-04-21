const express = require("express");
const cors=require("cors");
const timingRoutes=require("./routes/timingRoutes")
const app=express();
require("dotenv").config();

// app.use(cors());
app.use(express.json());
app.use("/doctor-availability",timingRoutes);

const server=app.listen(process.env.PORT,()=>{
    console.log(`Backend Server started on Port ${process.env.PORT}`);
})