const dotenv=require('dotenv')
dotenv.config()
const nodemailer = require('nodemailer');
const express=require('express');
const cors=require('cors')
const app=express();
const mongoose=require('mongoose')
const orders=require('./models/database');

const job= require('./cron')
job.start()

app.use(express.json());
app.use(cors());

app.post('/',async(req,res)=>{
  let email=req.body.email
  let phone=req.body.phone
  const mailOptions = {
      from: process.env.from_mail,
      to: email,
      subject: process.env.subject,
      text: `Congratulations your order has been successfully placed. You will be contacted on ${phone} by our team as soon as possible.`,
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.from_mail,
        pass: process.env.pass,
    }
});
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
          email:email,
          phone:phone
        });
       
        await order.save();
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              res.send('Error sending email');
          } else {
             res.send("order placed");
          }
      });
      res.send("order placed");
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
})
console.log(process.env.port)
mongoose.connect(process.env.mongo_uri).then(()=>{
    app.listen(process.env.port,()=>{
        console.log("server started")
    })
}).catch((err)=>{
    console.log(err);
})