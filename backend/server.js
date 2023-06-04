require('dotenv').config()

const express=require('express');
const cors=require('cors')
const app=express();
const mongoose=require('mongoose')
const orders=require('./models/database');

app.use(express.json());
app.use(cors(3000))

app.post('/',async(req,res)=>{
    try {
        let order = new orders({
          laces: req.body.laces,
          mesh: req.body.mesh,
          caps: req.body.caps,
          inner: req.body.inner,
          soul: req.body.soul,
          stripes: req.body.stripes,
          band: req.body.band,
          patch: req.body.patch,
        });
    
        await order.save();
        res.send("order placed");
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
})

mongoose.connect(process.env.mongo_uri).then(()=>{
    app.listen(process.env.port,()=>{
        console.log("server started")
    })
}).catch((err)=>{
    console.log(err);
})