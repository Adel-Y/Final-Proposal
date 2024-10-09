console.log('I entered')
const express = require('express');
const router = express.Router();
const Node = require('../models/Node');
const Edge = require('../models/Edge');

let relationships=[];
let tables=[];
let codeData=[];
let finalTables={tables:[]};


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


async function relationshipMatcher  ()  {
    const relationshipNodes = await Node.where("type").equals("Relationship");


    const relationshipEdges = await Edge.where("type").equals("custom-edge");

    const attributeNodes = await Node.where("type").equals("Attribute");

    const entityNodes= await Node.where("type").equals("Entity");

    const attributesEdges = await Edge.where("type").equals("straight-edge");

    const compAttributeEdges = await Edge.where("type").equals("attribute-edge");

      relationships =relationshipNodes.map((node)=>{
 
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


          tables = entityNodes.map((entityNode) => {
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
                        

                        
                    }
        
                    return null; // Default return for no match
                  })
                  .filter((node) => node) // Filter out null or undefined nodes
              );
            }
          });

          return tab;
        });
      
}





function removeDuplicates(data) {
    const uniqueTables = [];
    const seenTables = new Set();
  
    data.tables.forEach((table) => {
      if (!seenTables.has(table.name)) {
        const uniqueColumns = [];
        const seenColumns = new Set();
  
        table.columns.forEach((column) => {
          if (Array.isArray(column)) {
            // Handle nested arrays of columns
            column.forEach((subColumn) => {
              if (!seenColumns.has(subColumn.name)) {
                uniqueColumns.push(subColumn);
                seenColumns.add(subColumn.name);
              }
            });
          } else {
            // Handle single columns
            if (!seenColumns.has(column.name)) {
              uniqueColumns.push(column);
              seenColumns.add(column.name);
            }
          }
        });
  
        uniqueTables.push({
          name: table.name,
          columns: uniqueColumns,
        });
        seenTables.add(table.name);
      }
    });
  
    return { tables: uniqueTables };
  }
  



function flipCoin() {
    const randomIndex = Math.floor(Math.random() * 2); // Randomly returns 0 or 1
    return randomIndex === 0 ? 0 : 1;
  }

const tablesRenderer = (relationships,tables)=>{

    const relationalModels = {tables: relationships.map((rel)=>{

        if(rel.cardinality1 ==="one" && rel.cardinality2==="many"){

            const entity2 = tables.filter((table)=>table.id===rel.entity2)[0]

            const table2={name:entity2.name,columns:entity2.attributes.map((attr)=>{
                return attr[0]
            })}
            

            const  foreignAttributes = tables.filter((table)=>table.id===rel.entity2)[0].attributes.map((attr)=>{
                // console.log(attr[0])
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

            finalTables.tables.push(model,table2)
        //    return [model,table2]
        }

        if(rel.cardinality1 ==="many" && rel.cardinality2==="one"){

            const entity1 = tables.filter((table)=>table.id===rel.entity1)[0]

            const table1={name:entity1.name,columns:entity1.attributes.map((attr)=>{
                return attr[0]
            })}
           

           const  foreignAttributes = tables.filter((table)=>table.id===rel.entity1)[0].attributes.map((attr)=>{
            //console.log(attr[0])
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

            finalTables.tables.push(model,table1)
            // return model,table1
        }


        if(rel.cardinality1 ==="many" && rel.cardinality2==="many"){

            //console.log(tables.filter((table)=>table.id===rel.entity1)[0].attributes[2][0])

            const entity1 = tables.filter((table)=>table.id===rel.entity1)[0]

            const table1={name:entity1.name,columns:entity1.attributes.map((attr)=>{
                return attr[0]
            })}

            const entity2 = tables.filter((table)=>table.id===rel.entity2)[0]

            const table2={name:entity2.name,columns:entity2.attributes.map((attr)=>{
                return attr[0]
            })}

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
             finalTables.tables.push(model,table1,table2)
            // return model
        }
        if(rel.cardinality1 ==="one" && rel.cardinality2==="one"){

            const flip = flipCoin();

            if(flip===0){

                const entity1 = tables.filter((table)=>table.id===rel.entity1)[0]

                const table1={name:entity1.name,columns:entity1.attributes.map((attr)=>{
                    return attr[0]
                })}

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
                finalTables.tables.push(model,table1)
            //    return model

            }
            
            else if(flip===1){

                const entity2 = tables.filter((table)=>table.id===rel.entity2)[0]

                const table2={name:entity2.name,columns:entity2.attributes.map((attr)=>{
                    return attr[0]
                })}
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
                finalTables.tables.push(model,table2)
            //    return model
            }


        }
    }) }

    return relationalModels

}





router.get('/testerQuery', async (req, res) => {
    try {
        
        await relationshipMatcher(); 
          
          
          
            

        // console.log(JSON.stringify(tables)) 

        tablesRenderer(relationships,tables)



    const result = removeDuplicates(finalTables)
    
        res.send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

 console.log(codeData)



 router.get('/relCode', async (req, res) => {
    try {

        await relationshipMatcher(); 


        res.send({relationships:relationships,tables:tables});

    } catch (err) {
      res.status(400).json(err.message);
    }
  });

  module.exports = router;



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