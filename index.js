require('dotenv').config();
const express = require('express');
const cors =require ('cors');
const helmet = require ('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require ('mongoose');
const authRouter = require('./routers/authRouter')
const postsRouter = require('./routers/postsRouter')
const app = express();
app.use(cors({
  origin: ['http://localhost:4200',
  'https://auth-project-kmt6.onrender.com'],// ✅ frontend URL
  credentials: true                 // ✅ allow cookies
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Database Connected')
}).catch((err)=>{
console.log(err)
});
app.use('/api/auth',authRouter);
app.use('/api/posts',postsRouter)
app.get('/',(req,res)=>{
    res.json('hello fro the server');
})
//const PORT = process.env.PORT || 8000;

app.listen(process.env.PORT, () => {
  console.log('listening..');
});
