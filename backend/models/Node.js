// models/Node.js
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

// Define the schema for the user
const nodeSchema = new mongoose.Schema({
    
    id:{
        type : String,
        required:true
    },
    
    
    data:{
        color:{
        type : String
        },

        label: {

        type : String,
        required:true

        },
        name:{
            type : String,
            required:true
        }, 

        weak:{
            type : Boolean,
            required:true
        } 

    },

    position:{
        x: Number,
        y:Number
    },
  type:{
    type:String
  },

});

// Create a model based on the schema
const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;