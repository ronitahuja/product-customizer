const cron =require('cron')
const https =require('https')

const backend='https://product-customizer-backend.onrender.com'
const job=new cron.CronJob('*/14 * * * *',function(){
    console.log(`Restarting server`);

    https.get(backend,(res)=>{
        if(res.statusCode===200){
            console.log('Server restarted');
        }else{
            console.error(`failed to restart:${res.statusCode}`);
        }
    })
    .on('error',(err)=>{
        console.error('Error during restarting',err.message);
    })
})
module.exports=job