require('dotenv').config();
const express = require('express');
const cors =require ('cors');
const helmet = require ('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require ('mongoose');
const authRouter = require('./routers/authRouter')
const postsRouter = require('./routers/postsRouter')
const app = express();
const allowedOrigins = [
  'http://localhost:4200',
  'https://vivek-auth-store.web.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allows non-browser requests (like Postman)
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Preflight requests
app.options('*', cors());


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
