// models/Node.js
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

// Define the schema for the user
const edgeSchema = new mongoose.Schema({
    
    id:{
        type : String,
        //required:true
    },
    
    
    data:{
        cardinality: {type:String},
        //required : true


    },

    markerStart:{
      type:{type:String},
      width:{type:String},
      height:{type:String},
      color:{type:String}
               },

   //  markerEnd:{
   //    type:{
   //       type:String
   //    },

   //    color:{
   //       type:String
   //    }

   //  },

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
  tag:{
    type:String
  }

});

// Create a model based on the schema
const Edge = mongoose.model('Edge', edgeSchema);

module.exports = Edge;