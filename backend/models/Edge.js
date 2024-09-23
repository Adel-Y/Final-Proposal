// models/Node.js
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

// Define the schema for the user
const edgeSchema = new mongoose.Schema({
    
    id:{
        type : String,
        required:true
    },
    
    
    data:{
        cardinality: String,
        //required : true

    },

    source:{
       type: String,
    },
    sourceHandle:{
        type: String,
     },
     target:{
        type: String,
     },
     targetHandle:{
        type: String,
     },
  type:{
    type:String
  },

});

// Create a model based on the schema
const Edge = mongoose.model('Edge', edgeSchema);

module.exports = Edge;