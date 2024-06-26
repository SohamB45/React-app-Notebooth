const mongoose = require('mongoose');
const {Schema} =mongoose;   
const ObjectId = mongoose.Types.ObjectId;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required: true

    },
    description:{
        type:String,
        required: true,
        

    },
    tag:{
        type:String,
        

    },
    
    date:{
        type:Date,
        default:Date.now

    }
    

    
});
module.exports = mongoose.model('notes',NotesSchema);