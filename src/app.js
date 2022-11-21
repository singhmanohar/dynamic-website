const express=require("express");
const mongoose=require("mongoose");
const hbs=require("hbs");
const path=require("path");
require("./db/conn");
const User=require("./models/Userschema");

const app=express();
app.use(express.urlencoded({extended:false}));
const PORT=process.env.PORT||80;
// app.use(urlencoded());

const staticpath=path.join(__dirname,"../public");
const viewpath=path.join(__dirname,"../template/views");
const partialspath=path.join(__dirname,"../template/partials");
app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set("views",viewpath);
hbs.registerPartials(partialspath);

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/contact",async (req,res)=>{
    try {
        const userData=new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT,()=>{
    console.log(`this website will run on port number ${PORT}`);
})