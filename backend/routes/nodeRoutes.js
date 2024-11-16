// routes/userRoutes.js
console.log('I entered')
const express = require('express');
const Node = require('../models/Node');
const router = express.Router();

// POST route to create a new user
router.post('/nodes', async (req, res) => {
  try {
    const node = new Node(req.body);
    await node.save();
    res.status(201).json(node);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// GET route to fetch all users
router.get('/nodes', async (req, res) => {
  try {
    const nodes = await Node.find();
    res.send(nodes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});




// POST route to fetch a single user by ID
router.get('/oneNode/:id', async (req, res) => {
  console.log(req.params)
  try {
    const node = await Node.findOne({"id":req.params.id});
    if (!node) {
      return res.status(404).send('Node not found');
    }
    res.send(node);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT route to update a user by ID
router.put('/nodes/:id', async (req, res) => {
  try {
    // Node.deleteOne({"id":req.params.id})
    const node = await Node.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!node) {
      return res.status(404).send('User not found');
    }
    res.send(node);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.put('/nodes/data/:id', async (req, res) => {
  //console.log(req.body)

  const {id,data}=req.body[0]


  console.log(id,data);
  try {

    // Node.deleteOne({"id":req.params.id})
    const node = await Node.updateOne({"id":req.params.id},{$set:{'data':req.body[0].data}}, {
      new: true,
      runValidators: true,
    });
    if (!node) {
      return res.status(404).send('User not found');
    }
    res.send(node);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.put('/nodes/position/:id', async (req, res) => {
  // console.log(req.body)
  try {

    // Node.deleteOne({"id":req.params.id})
    const node = await Node.updateOne({"id":req.params.id}, {$set:{'position':req.body[0].position}}, {
      new: true,
      runValidators: true,
    });
    if (!node) {
      return res.status(404).send('User not found');
    }
    res.send(node);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


// DELETE route to remove a user by ID
router.delete('/nodes/:id', async (req, res) => {
  try {
    const node = await Node.deleteOne({"id":req.params.id});
    if (!node) {
      return res.status(404).send('User not found');
    }
    res.send(node);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



router.put('/nodes/attributes/:id', async (req, res) => {
  //console.log(req.body.attribute)
  const newAttribute = req.body.attribute
  console.log(newAttribute)
  try {

    //Node.deleteOne({"id":req.params.id})
    const node = await Node.updateOne({"id":req.params.id}, {$push:{'attributes': newAttribute }}, {
      new: true,
      runValidators: true,
    });
    if (!node) {
      return res.status(404).send('User not found');
    }
    res.send(node);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.delete('/nodeAttr/:id', async (req, res) => {
  try {
    const node = await Node.deleteOne({"id":req.params.id});
    if (!node) {
      return res.status(404).send('User not found');
    }
    res.send(node);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
