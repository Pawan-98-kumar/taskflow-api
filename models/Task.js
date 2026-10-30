const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title:{type:String,
          required:true,
          minlength: 1,
          trim: true
    },

    description:{
        type:String,
        required:true,
         minlength: 1,
         trim: true
    },

    completed:{
        type:Boolean,
        default:false
    },

    userId: {
            type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
              required: true
        }
})
module.exports = mongoose.model('Task',taskSchema)