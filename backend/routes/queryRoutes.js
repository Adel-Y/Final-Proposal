console.log('I entered')
const express = require('express');
const { stringify, parse } = require('flatted');
const router = express.Router();
const Node = require('../models/Node');
const Edge = require('../models/Edge');


router.get('/testerQuery', async (req, res) => {
    try {
      const relationshipNodes = await Node.where("type").equals("Relationship");
      //console.log(relationshipNodes)

      const relationshipEdges = await Edge.where("type").equals("custom-edge");

    const relationships =relationshipNodes.map((node)=>{
        // console.log(node)
        let rel ={id:node.id};
        let i=1;
        relationshipEdges.map((edge)=>{
                // console.log(edge)
                if(node.id === edge.target){
                    rel['entity'+i]=edge.source
                    rel['cardinality'+i]=edge.data.cardinality
                    i++;
                }

            })
            return rel;
        })
      
    //   console.log(relationships)

    const attributeNodes = await Node.where("type").equals("Attribute");

    const entityNodes= await Node.where("type").equals("Entity");

    const attributesEdges = await Edge.where("type").equals("straight-edge");

    const tables =entityNodes.map((node)=>{

        let tab ={id:node.id,name:node.data.name,attributes:[]};

        attributesEdges.map((edge)=>{
                if(node.id === edge.target){

                    tab.attributes.push(attributeNodes.map((node)=>{
                        if(node.id===edge.source){
                            return {
                                name:node.data.name, 
                                primaryKey:node.data.primaryKey,
                                type:node.data.attributeType,
                                dataFormat:node.data.dataType,
                                size:node.data.dataSize}
                        }
                    }).filter((node)=>node)) 
                }

            })
            return tab;
        })


      res.send(tables);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  router.get('/testerQuery2', async (req, res) => {
    try {




      const relationships = await Edge.aggregate([
        {   $match:{ 
                type: "custom-edge"
            }

        },
        {
            $lookup:{

                from : "nodes",
                localField : "target",
                foreignField: "id",
                as:"commonTarget"

            },

            // $lookup:{

            //     from : "edges",
            //     localField : "id",
            //     foreignField: "target",
            //     as:"commonTarget"

            // },
        },
        // {
        //     $unwind : "$commonTarget"
        // },

        // {
        //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$commonTarget", 0 ] }, "$$ROOT" ] } }
        //  },

            {
            $project:{
                commonTarget:1
                // source: "$commonTarget.source"
            }
            
        },
      ]);
      res.send(relationships);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  module.exports = router;