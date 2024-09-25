console.log('I entered')
const express = require('express');
const router = express.Router();
const Node = require('../models/Node');
const Edge = require('../models/Edge');


router.get('/testerQuery', async (req, res) => {
    try {
      const relationshipNodes = await Node.where("type").equals("Relationship");

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
      
      console.log(relationships)


      res.send(relationships);
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