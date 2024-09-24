console.log('I entered')
const express = require('express');
const router = express.Router();
const Node = require('../models/Node');
const Edge = require('../models/Edge');


router.get('/testerQuery', async (req, res) => {
    try {
      const nodes = await Node.find({id:{

      }});
      res.send(nodes);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  router.get('/testerQuery2', async (req, res) => {
    try {
      const relationships = await Node.aggregate([
        {
            $lookup:{

                from : "edges",
                localField : "id",
                foreignField: "target",
                as:"commonTarget"

            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$commonTarget", 0 ] }, "$$ROOT" ] } }
         },
            // $group:{
            //     _id:"$target",
            //     //target:"$target",
            //     mergedSources:{$mergeObjects:"$source"},

            // },
            {
            $project:{commonTarget:0}
            
        },
      ]);
      res.send(relationships);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  module.exports = router;