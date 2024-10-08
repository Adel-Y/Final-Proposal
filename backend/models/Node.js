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
        type : String,
        //required:true
        },

        label: {

        type : String,
        //required:true

        },
        name:{
            type : String,
           // required:true
        }, 

        weak:{ // for entities and relationships
            type : Boolean,
            
        },
        primaryKey:{ // for attributes
            type: Boolean,
        },
        attributeType:{ // for attributes
            type:String,
        },
        dataType:{ // for attributes
            type:String,
        },
        dataSize:{ // for attributes
            type:Number,
        },

        collapseType:{
            type:String
        }

    },

    position:{
        x: Number,
        y:Number
    },
  type:{
    type:String
  },
  tag:{
    type:String
  }

});

// Create a model based on the schema
const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;