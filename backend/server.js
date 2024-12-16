const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

const cors = require('cors');

app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

// Use the routers
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.get("/",(req,res)=>{
    res.send("i am server")
})

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})