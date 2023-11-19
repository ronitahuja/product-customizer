var mongoose=require('mongoose');

var colorschema=new mongoose.Schema({
    laces:String,
    mesh:String,
    caps:String,
    inner:String,
    soul:String,
    stripes:String,
    band:String,
    patch:String,
    email:String,
    phone:String
},{timestamps:true})

module.exports = mongoose.model('orders',colorschema)