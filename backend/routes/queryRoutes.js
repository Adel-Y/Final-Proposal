console.log('I entered')
const express = require('express');
const router = express.Router();
const Node = require('../models/Node');
const Edge = require('../models/Edge');


let codeData=[];

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

    const relationalModels = {tables: relationships.map((rel)=>{

        if(rel.cardinality1 ==="one" && rel.cardinality2==="many"){

            const  foreignAttributes = tables.filter((table)=>table.id===rel.entity2)[0].attributes.map((attr)=>{
                if(attr[0].primaryKey === true){
                    return attr[0]
                }
            }).filter(attr=>attr)[0];

            const foreignKey={
                foreignTable:tables.filter((table)=>table.id===rel.entity2)[0].name,
                name: tables.filter((table)=>table.id===rel.entity2)[0].name+"_id",
                foreignKey: true,
                dataType: foreignAttributes.dataType,
                dataSize: foreignAttributes.dataSize
            
            } 

            const target=tables.filter((table)=>table.id===rel.entity1 )
            const attributes =   target[0].attributes.map((attr)=>{
                if(attr){
                    return attr[0]
                }
            })

            attributes.push(foreignKey)
            const model ={name:target[0].name,columns:attributes}

           return model
        }

        if(rel.cardinality1 ==="many" && rel.cardinality2==="one"){

           const  foreignAttributes = tables.filter((table)=>table.id===rel.entity1)[0].attributes.map((attr)=>{
            if(attr[0].primaryKey === true){
                return attr[0]
            }
        }).filter(attr=>attr)[0];

            const foreignKey={
                foreignTable:tables.filter((table)=>table.id===rel.entity1)[0].name,
                name: tables.filter((table)=>table.id===rel.entity1)[0].name+"_id",
                foreignKey: true,
                dataType: foreignAttributes.dataType,
                dataSize: foreignAttributes.dataSize
            
            } 

             const target=tables.filter((table)=>table.id===rel.entity2 )
             const attributes =   target[0].attributes.map((attr)=>{
                if(attr){
                    return attr[0]
                }
            })
            //console.log(attributes)
            attributes.push(foreignKey)
            const model ={name:target[0].name,columns:attributes}
            return model
        }


        if(rel.cardinality1 ==="many" && rel.cardinality2==="many"){

            //console.log(tables.filter((table)=>table.id===rel.entity1)[0].attributes[2][0])

            const target1=tables.filter((table)=>table.id===rel.entity2 )
            const attributes1 =   target1[0].attributes.map((attr)=>{
               if(attr[0].primaryKey === true){
                   return attr[0]
               }
           }).filter(attr=>attr)[0]


            const foreignKey1= {
                foreignTable:tables.filter((table)=>table.id===rel.entity1)[0].name,
                name: tables.filter((table)=>table.id===rel.entity1)[0].name+"_id",
                foreignKey: true,
                dataType: attributes1.dataType,
                dataSize: attributes1.dataSize
            
            } 

            const target2=tables.filter((table)=>table.id===rel.entity2 )
            const attributes2 =   target2[0].attributes.map((attr)=>{
               if(attr[0].primaryKey === true){
                   return attr[0]
               }
           }).filter(attr=>attr)[0]

            const foreignKey2= {
                foreignTable:tables.filter((table)=>table.id===rel.entity2)[0].name,
                name: tables.filter((table)=>table.id===rel.entity2)[0].name+"_id",
                foreignKey: true,
                dataType: attributes2.dataType,
                dataSize: attributes2.dataSize
            
            } 

             const model={name:rel.name,columns:[foreignKey1,foreignKey2]}
            return model
        }
        if(rel.cardinality1 ==="one" && rel.cardinality2==="one"){

            const flip = flipCoin();

            if(flip===0){

                const  foreignAttributes = tables.filter((table)=>table.id===rel.entity1)[0].attributes.map((attr)=>{
                    if(attr[0].primaryKey === true){
                        return attr[0]
                    }
                }).filter(attr=>attr)[0];
        
                    const foreignKey={
                        foreignTable:tables.filter((table)=>table.id===rel.entity1)[0].name,
                        name: tables.filter((table)=>table.id===rel.entity1)[0].name+"_id",
                        foreignKey: true,
                        dataType: foreignAttributes.dataType,
                        dataSize: foreignAttributes.dataSize
                    
                    } 

                const target=tables.filter((table)=>table.id===rel.entity2 )
                const attributes =   target[0].attributes.map((attr)=>{
                    if(attr){
                        return attr[0]
                    }
                })

                attributes.push(foreignKey)
                const model ={name:target[0].name,columns:attributes}
               return model

            }
            
            else if(flip===1){


                const  foreignAttributes = tables.filter((table)=>table.id===rel.entity2)[0].attributes.map((attr)=>{
                    if(attr[0].primaryKey === true){
                        return attr[0]
                    }
                }).filter(attr=>attr)[0];
        
                    const foreignKey={
                        foreignTable:tables.filter((table)=>table.id===rel.entity2)[0].name,
                        name: tables.filter((table)=>table.id===rel.entity2)[0].name+"_id",
                        foreignKey: true,
                        dataType: foreignAttributes.dataType,
                        dataSize: foreignAttributes.dataSize
                    
                    } 

                const target=tables.filter((table)=>table.id===rel.entity1 )
                const attributes =   target[0].attributes.map((attr)=>{
                    if(attr){
                        return attr[0]
                    }
                })

                attributes.push(foreignKey)
                const model ={name:target[0].name,columns:attributes}
               return model
            }


        }
    }) }

    return relationalModels

}


router.get('/testerQuery', async (req, res) => {
    try {
      const relationshipNodes = await Node.where("type").equals("Relationship");


      const relationshipEdges = await Edge.where("type").equals("custom-edge");

      const attributeNodes = await Node.where("type").equals("Attribute");

      const entityNodes= await Node.where("type").equals("Entity");
  
      const attributesEdges = await Edge.where("type").equals("straight-edge");

      const compAttributeEdges = await Edge.where("type").equals("attribute-edge");

    const relationships =relationshipNodes.map((node)=>{
   
        let rel ={id:node.id,name:node.data.name};
        let i=1;
        relationshipEdges.map((edge)=>{
                
                if(node.id === edge.target){
                    rel['entity'+i]=edge.source
                    rel['cardinality'+i]=  cardinalityRenderer(edge.data.cardinality)
                    i++;
                }

            })
            return rel;
        })
      
            const temp=(item)=>{
                console.log(item)
                console.log("returned")
                return item
            }

        const tables = entityNodes.map((entityNode) => {
            let tab = { id: entityNode.id, name: entityNode.data.name, attributes: [] };
          
            attributesEdges.map((edge) => {
              if (entityNode.id === edge.target) {
                tab.attributes.push(
                  attributeNodes
                    .map((node) => {
                      // Non-composite attribute case
                      if (node.id === edge.source && node.data.attributeType !== "composite") {
                        return {
                          name: node.data.name,
                          primaryKey: node.data.primaryKey,
                          dataType: node.data.dataType,
                          dataSize: node.data.dataSize,
                        };
                      }
          
                      // Composite attribute case
                      else if (node.id === edge.source && node.data.attributeType === "composite") {
                        // Return results of compAttributeEdges.map
                        return compAttributeEdges
                          .map((tedge) => {
                            if (tedge.target === node.id) {
                              return attributeNodes
                                .map((xnode) => {
                                  if (xnode.id === tedge.source) {
                                    return {
                                      name: xnode.data.name,
                                      primaryKey: xnode.data.primaryKey,
                                      dataType: xnode.data.dataType,
                                      dataSize: xnode.data.dataSize,
                                    };
                                  }
                                  return null; // Return null if no match, so filter can remove empty results
                                })
                                .filter((xnode) => xnode); // Filter out null results
                            }
                            return null; // Return null if no match, so filter can remove empty results
                          })
                          .flat() // Flatten the array to prevent nested arrays
                          .filter((compositeNode) => compositeNode); // Filter out any null results
                          
                          console.log(x)
                          
                        //   for(j=0;j<x.length;j++){
                        //   while(i<=x.length){
                        //     console.log(x[i])

                        //     return x[i];
                        //   }
                        // }
                          //x.forEach(temp)

                          
                      }
          
                      return null; // Default return for no match
                    })
                    .filter((node) => node) // Filter out null or undefined nodes
                );
              }
            });

            return tab;
          });
        
  
          
          
          
            

        // console.log(JSON.stringify(tables))

    const result =tablesRenderer(relationships,tables)

    codeData = result;


      res.send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

 console.log(codeData)


 router.post('/sqlCode', async (req, res) => {
    try {
        codeData =req.body
    //   const node = new Node(req.body);
    //   await node.save();
      res.status(201).json(codeData);
    } catch (err) {
      res.status(400).json(err.message);
    }
  });

  module.exports = router;