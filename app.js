import cors from 'cors'
import express from "express";
import bodyParser  from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import router from './routes/userroute.js'
import connection from './database/connectDB.js';
import './database/model.js';
const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
const port=process.env.PORT || '4000'
const DATABASE_URL=process.env.DATABASE_URL


app.get('/',(req,res)=>{
    res.send("Hello world from express");
})

app.use('/',router);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then( ()=>{
    console.log(`Database connected 😎`);
})
.catch(err =>{
    console.log(err);
});
app.listen(port,()=>{
    console.log(`listening to ${port}  port`);
})