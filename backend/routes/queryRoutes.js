console.log('I entered')
const express = require('express');
const router = express.Router();
const Node = require('../models/Node');
const Edge = require('../models/Edge');




const cardinalityRenderer =(value)=>{

    let x ="";
    
    switch(value){
        
        case'zero-to-one':{

            x ="one"
            return x;

        }
        case'one-to-one':{
            x ="one"
            return x;
           
        }
        case'zero-to-many':{
            x="many"
            return x;
           
        }
        case'one-to-many':{
            x="many"
            return x;
        }

    }


}

function flipCoin() {
    const randomIndex = Math.floor(Math.random() * 2); // Randomly returns 0 or 1
    return randomIndex === 0 ? 0 : 1;
  }

const tablesRenderer = (relationships,tables)=>{

    const relationalModels = relationships.map((rel)=>{

        if(rel.cardinality1 ==="one" && rel.cardinality2==="many"){

            const foreignKey= tables.filter((table)=>table.id===rel.entity2)[0].name+"_id"

            const target=tables.filter((table)=>table.id===rel.entity1 )
            target[0].attributes.push({foreignKey:foreignKey})
            const model ={name:target[0].name,id:'id'}
            let i =0;
            target[0].attributes.map((att)=>{
                model["attribute"+i]=att
                i++
            })

           return model
        }

        if(rel.cardinality1 ==="many" && rel.cardinality2==="one"){

            const foreignKey= tables.filter((table)=>table.id===rel.entity1)[0].name+"_id"

             const target=tables.filter((table)=>table.id===rel.entity2 )
             target[0].attributes.push({foreignKey:foreignKey})
             const model ={name:target[0].name,id:'id'}
             let i =0;
             target[0].attributes.map((att)=>{
                 model["attribute"+i]=att
                 i++
             })
            return model
        }


        if(rel.cardinality1 ==="many" && rel.cardinality2==="many"){

            const foreignKey1= tables.filter((table)=>table.id===rel.entity1)[0].name+"_id"

            const foreignKey2= tables.filter((table)=>table.id===rel.entity2)[0].name+"_id"

             const model={name:rel.name,id:"id",key1:foreignKey1,key2:foreignKey2}
            return model
        }
        if(rel.cardinality1 ==="one" && rel.cardinality2==="one"){

            const flip = flipCoin();

            if(flip===0){

                const foreignKey= tables.filter((table)=>table.id===rel.entity1)[0].name+"_id"

                const target=tables.filter((table)=>table.id===rel.entity2 )
                target[0].attributes.push({foreignKey:foreignKey})
                const model ={name:target[0].name,id:'id'}
                let i =0;
                target[0].attributes.map((att)=>{
                    model["attribute"+i]=att
                    i++
                })
               return model

            }
            
            else if(flip===1){


                const foreignKey= tables.filter((table)=>table.id===rel.entity2)[0].name+"_id"

                const target=tables.filter((table)=>table.id===rel.entity1 )
                target[0].attributes.push({foreignKey:foreignKey})
                const model ={name:target[0].name,id:'id'}
                let i =0;
                target[0].attributes.map((att)=>{
                    model["attribute"+i]=att
                    i++
                })
               return model
            }


        }
    })

    return relationalModels

}


router.get('/testerQuery', async (req, res) => {
    try {
      const relationshipNodes = await Node.where("type").equals("Relationship");
      //console.log(relationshipNodes)

      const relationshipEdges = await Edge.where("type").equals("custom-edge");

      const attributeNodes = await Node.where("type").equals("Attribute");

      const entityNodes= await Node.where("type").equals("Entity");
  
      const attributesEdges = await Edge.where("type").equals("straight-edge");

    const relationships =relationshipNodes.map((node)=>{
        // console.log(node)
        let rel ={id:node.id,name:node.data.name};
        let i=1;
        relationshipEdges.map((edge)=>{
                // console.log(edge)
                if(node.id === edge.target){
                    rel['entity'+i]=edge.source
                    rel['cardinality'+i]=  cardinalityRenderer(edge.data.cardinality)
                    i++;
                }

            })
            return rel;
        })
      
    //   console.log(relationships)



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
                                size:node.data.dataSize
                            }
                        }
                    }).filter((node)=>node)) 
                }

            })
            return tab;
        })


    const result =tablesRenderer(relationships,tables)


      res.send(result);
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