//MAIN BACKEND FILE

const MoviesModel = require("./database/movies");
const UserModel = require("./database/users");
require('dotenv').config()

 

const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json());

// var app = express()



//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection 
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));



// http://localhost:3001
app.get("/",(req,res) =>{
    
    return res.json({"Welcome" :`to my BOOK-MY-SHOW backend software`});
});
// http://localhost:3001/movies
app.get("/movies", async (req,res) =>{
    const getAllMovies = await MoviesModel.find();
    return res.json(getAllMovies);
});
 
// http://localhost:3001/movie/:id
app.get("/movie/:id", async (req,res) =>{
    const {id} = req.params ;
    const getMovie = await MoviesModel.findOne({_id:id});
    return res.json(getMovie);
});


// http://localhost:3001/user-register
app.post("/user-register", async (req,res) =>{
    const addNewUser = await UserModel.create(req.body);
    return res.json({
        users : addNewUser,
        message : "User was added!!!"
    });
     
});
 





app.listen(process.env.PORT || 3001, () =>{
    console.log("My EXPRESS APP IS RUNNING")

});
  